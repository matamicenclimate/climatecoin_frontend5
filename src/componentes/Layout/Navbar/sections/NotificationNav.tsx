import clsx from 'clsx';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInWeeks,
  parseJSON,
} from 'date-fns';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from '@/componentes/Elements/Link/Link';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { Tooltip } from '@/componentes/Form/Tooltip';
import { Icon } from '@/componentes/Icon/Icon';
import { useGetNotifications } from '@/componentes/Layout/Navbar/api/useGetNotifications';
import { useMarkNotificationsAsRead } from '@/componentes/Layout/Navbar/api/useMarkNotificationsAsRead';
import Popover from '@/componentes/Popover/Popover';

import styles from './shared.module.css';

const modelToUrl: Record<string, string> = {
  'carbon-documents': 'documents',
};

const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: {
  condition: boolean;
  wrapper: (children: React.ReactChildren) => React.ReactElement;
  children: any;
}) => (condition ? wrapper(children) : children);

export const NotificationNav = () => {
  const notifications = useGetNotifications();
  const markAsRead = useMarkNotificationsAsRead();
  const { t } = useTranslation();
  const renderNotifications = () => {
    if (notifications.data) {
      return (
        <div>
          <ul className="divide-y">
            {notifications.data.map((notification) => {
              const getDate = () => {
                let data = differenceInWeeks(new Date(), parseJSON(notification.createdAt));
                if (data > 0) {
                  return `${data}w`;
                }
                data = differenceInDays(new Date(), parseJSON(notification.createdAt));
                if (data > 0) {
                  return `${data}d`;
                }
                data = differenceInHours(new Date(), parseJSON(notification.createdAt));
                if (data > 0) {
                  return `${data}h`;
                }
                data = differenceInMinutes(new Date(), parseJSON(notification.createdAt));
                return `${data}m`;
              };

              return (
                <li key={notification._id} className="flex items-center space-x-2 text-sm ">
                  <ConditionalWrapper
                    condition={!!notification.model}
                    wrapper={(children) => (
                      <Link
                        to={`/${modelToUrl[notification.model as string]}/${notification.model_id}`}
                        className={clsx(
                          'flex w-full items-center no-underline',
                          styles.popover__option
                        )}
                      >
                        {children}
                      </Link>
                    )}
                  >
                    <div>
                      <div
                        className={clsx(
                          ' h-2 w-2 rounded-full',
                          notification.is_read ? 'bg-neutral-5' : 'bg-primary-green'
                        )}
                      />
                    </div>
                    <div className="flex-grow space-y-1 pl-3">
                      <div className="flex w-full justify-between">
                        <div className="flex justify-center">
                          <div className="pr-2 font-medium">{notification.title}</div>
                          {notification.extended_message &&
                            renderExtendedInfo(notification.extended_message)}
                        </div>
                        <div className="break-normal text-xs">{getDate()}</div>
                      </div>
                      <div className="text-xs text-neutral-5">{notification.description}</div>
                    </div>
                  </ConditionalWrapper>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
    if (notifications.error instanceof Error) {
      return <>{('An error has occurred: ' + notifications.error.message) as string}</>;
    }
    return (
      <div className="flex items-center justify-center p-4">
        <Spinner />
      </div>
    );
  };

  const renderExtendedInfo = (info: string) => <Tooltip info={info} />;

  return (
    <div className="flex items-center">
      <Popover onClose={markAsRead.mutateAsync}>
        <Popover.Button>
          <button className={clsx(styles.button, 'relative')}>
            <Icon id="bell-line" className="h-7 w-7" />
            {notifications?.data
              ? notifications?.data?.filter((i) => !i.is_read).length > 0 && (
                  <div className="absolute right-3 top-3 h-3 w-3 rounded-full bg-primary-green" />
                )
              : null}
          </button>
        </Popover.Button>
        <Popover.Panel>
          <div className="w-96 space-y-3">
            <div className="flex justify-between text-xs text-neutral-4">
              <div>{t('components.Navbar.notifications.title')}</div>
              <div>
                <button
                  className="text-neutral-5"
                  onClick={() => markAsRead.mutateAsync()}
                  disabled={markAsRead.isLoading}
                >
                  {t('components.Navbar.notifications.clear')}
                </button>
              </div>
            </div>
            {renderNotifications()}
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};
