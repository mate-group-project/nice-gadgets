import { Menu } from '@base-ui/react/menu';
import { Icon } from '@/shared/components/Icon';
import './Dropdown.scss';

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  label?: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
};

export const Dropdown = ({
  label,
  value,
  options,
  onChange,
  className = '',
}: DropdownProps) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={`dropdown ${className}`}>
      {label && <span className="dropdown__label">{label}</span>}

      <Menu.Root>
        <Menu.Trigger className="dropdown__trigger">
          <span>{selectedOption?.label}</span>
          <Icon name="chevronDown" />
        </Menu.Trigger>

        <Menu.Portal>
          <Menu.Positioner
            side="bottom"
            align="start"
            sideOffset={4}
          >
            <Menu.Popup className="dropdown__popup">
              {options.map((option) => (
                <Menu.Item
                  key={option.value}
                  className="dropdown__item"
                  onClick={() => onChange(option.value)}
                >
                  {option.label}
                </Menu.Item>
              ))}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  );
};
