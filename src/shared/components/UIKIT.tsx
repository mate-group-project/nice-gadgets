import { Icon } from '@/shared/components/Icon';
import { Button } from '@base-ui/react';
import { Dropdown } from '@/shared/components/Dropdown';
import { useState } from 'react';

export const UIKIT = () => {
  const [dropdown, setDropdown] = useState('1');

  return (
    <div style={{ backgroundColor: 'white', margin: '50px', padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        icons:
        <Icon name="home" />
        <Icon name="bag" />
        <Icon name="heart" />
        <Icon name="heartFilled" />
        <Icon name="chevronDown" />
        <Icon name="chevronUp" />
        <Icon name="chevronLeft" />
        <Icon name="chevronRight" />
        <Icon name="close" />
        <Icon name="menu" />
        <Icon name="minus" />
        <Icon name="plus" />
        <Icon name="search" />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        buttons -- icon:
        <Button
          className="button__icon"
          onClick={() => {}}
        >
          1
        </Button>
        <Button
          className="button__icon"
          onClick={() => {}}
        >
          <Icon name="chevronRight" />
        </Button>
        <Button
          className="button__icon button--lg"
          onClick={() => {}}
        >
          <Icon name="heart" />
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        active buttons -- icon:
        <Button
          className="button__icon is-active"
          onClick={() => {}}
        >
          1
        </Button>
        <Button
          className="button__icon is-active"
          onClick={() => {}}
        >
          <Icon name="chevronRight" />
        </Button>
        <Button
          className="button__icon button--lg"
          onClick={() => {}}
        >
          <Icon
            name="heartFilled"
            className="text--accent-secondary"
          />
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        disabled buttons -- icon:
        <Button
          className="button__icon"
          onClick={() => {}}
          disabled
        >
          1
        </Button>
        <Button
          className="button__icon"
          onClick={() => {}}
          disabled
        >
          <Icon name="chevronRight" />
        </Button>
        <Button
          className="button__icon button--lg"
          onClick={() => {}}
          disabled
        >
          <Icon name="heart" />
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        buttons:
        <Button className="button">Primary</Button>
        <Button
          className="button"
          style={{ width: '180px' }}
        >
          Primary
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        active buttons:
        <Button className="button is-active">Primary</Button>
        <Button
          className="button is-active"
          style={{ width: '180px' }}
        >
          Primary
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        disabled buttons:
        <Button
          className="button"
          disabled
        >
          Primary
        </Button>
        <Button
          className="button"
          style={{ width: '180px' }}
          disabled
        >
          Primary
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        dropdown:
        <Dropdown
          label="Description"
          value={dropdown}
          options={[
            { label: 'item 1', value: '1' },
            { label: 'item 2', value: '2' },
            { label: 'item 3', value: '3' },
            { label: 'item 4', value: '4' },
          ]}
          onChange={(value) => setDropdown(value)}
        />
      </div>
    </div>
  );
};
