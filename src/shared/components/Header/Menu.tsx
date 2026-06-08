import { Dialog } from '@base-ui/react/dialog';
import cn from 'classnames';

import { Icon } from '@/shared/components/Icon';

import './Menu.scss';
import { Navigation } from '@/shared/components/Header/Navigation.tsx';
import { Actions } from '@/shared/components/Header/Actions.tsx';

interface Props {
  className?: string;
}

export const Menu = ({ className = '' }: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={cn('menu', className)}>
        <Icon name="menu" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="menu__backdrop" />

        <Dialog.Popup className="menu__popup">
          <div className="menu__header">
            <img
              src="/logo.png"
              alt="logo"
              width="404"
              height="145"
              className="logo"
            />
            <Dialog.Close className="menu__close">
              <Icon name="close" />
            </Dialog.Close>
          </div>
          <div className="menu__body">
            <Navigation />
            <Actions />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
