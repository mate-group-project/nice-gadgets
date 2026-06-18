import { Dialog } from '@base-ui/react/dialog';
import cn from 'classnames';
import { useState, useEffect } from 'react';

import { Icon } from '@/shared/components/Icon';

import './Menu.scss';
import { Navigation } from '@/shared/components/Header/Navigation.tsx';
import { Actions } from '@/shared/components/Header/Actions.tsx';

interface Props {
  className?: string;
  theme: string;
  onToggleTheme: () => void;
}

export const Menu = ({ className = '' , theme, onToggleTheme}: Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClose = () => {
      setOpen(false);
    };

    window.addEventListener('resize', handleClose);
    window.addEventListener('orientationchange', handleClose);

    return () => {
      window.removeEventListener('resize', handleClose);
      window.removeEventListener('orientationchange', handleClose);
    };
  }, []);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
    >
      <Dialog.Trigger className={cn('menu', className)}>
        <Icon name="menu" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="menu__backdrop" />

        <Dialog.Popup className="menu__popup">
          <div className="menu__header">
            {theme === 'light' ?
          <img
            src="/dark-logo.png"
            alt="logo"
            width="404"
            height="145"
            className="logo"
          />
        : <img
            src="/light-logo.png"
            alt="logo"
            width="404"
            height="145"
            className="logo"
          />
        }
            <Dialog.Close className="menu__close">
              <Icon name="close" />
            </Dialog.Close>
          </div>
          <div className="menu__body">
            <Navigation onNavigate={() => setOpen(false)} />
            <div className="menu__footer">
              <Actions
                onNavigate={() => setOpen(false)}
                onToggleTheme={onToggleTheme}
                theme={theme}
              />
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
