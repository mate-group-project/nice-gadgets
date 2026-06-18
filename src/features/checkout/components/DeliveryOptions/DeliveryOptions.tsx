import { Dropdown } from '@/shared/components/Dropdown';
import type { City, Warehouse } from '../../types/types';

interface DeliveryOptionsProps {
  deliveryType: 'pickup' | 'delivery';
  setDeliveryType: (type: 'pickup' | 'delivery') => void;
  storeId: string;
  setStoreId: (id: string) => void;
  storeOptions: { label: string; value: string }[];
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  citySearch: string;
  setCitySearch: (value: string) => void;
  cities: City[];
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
  warehouses: Warehouse[];
  warehouseSearch: string;
  setWarehouseSearch: (value: string) => void;
  selectedWarehouse: Warehouse | null;
  setSelectedWarehouse: (warehouse: Warehouse | null) => void;
  loadingWarehouses: boolean;
}

export const DeliveryOptions = ({
  deliveryType,
  setDeliveryType,
  storeId,
  setStoreId,
  storeOptions,
  errors,
  setErrors,
  citySearch,
  setCitySearch,
  cities,
  selectedCity,
  setSelectedCity,
  warehouses,
  warehouseSearch,
  setWarehouseSearch,
  selectedWarehouse,
  setSelectedWarehouse,
  loadingWarehouses,
}: DeliveryOptionsProps) => (
  <>
    <h2>Delivery method</h2>

    {/* Pickup */}
    <div className="delivery__method">
      <label className={`radio__item ${deliveryType === 'pickup' ? 'radio__item--active' : ''}`}>
        <input
          type="radio"
          className="radio__input"
          checked={deliveryType === 'pickup'}
          onChange={() => setDeliveryType('pickup')}
        />
        <span className="radio__label">Pickup (store)</span>
      </label>

      {deliveryType === 'pickup' && (
        <div className="delivery__dropdown-nogap">
          <Dropdown
            label="Select store"
            value={storeId}
            options={storeOptions}
            onChange={(value) => {
              setStoreId(value);
              setErrors((prev) => ({ ...prev, store: '' }));
            }}
          />
          {errors.store && <p className="error">{errors.store}</p>}
        </div>
      )}
    </div>

    {/* Delivery */}
    <div className="delivery__method">
      <label className={`radio__item ${deliveryType === 'delivery' ? 'radio__item--active' : ''}`}>
        <input
          type="radio"
          className="radio__input"
          checked={deliveryType === 'delivery'}
          onChange={() => setDeliveryType('delivery')}
        />
        <span className="radio__label">Nova Poshta delivery</span>
      </label>

      {deliveryType === 'delivery' && (
        <div className="delivery__dropdown">
          {/* City search */}
          <p className="delivery__title">Search city</p>
          <div>
            <input
              placeholder="Search city"
              value={citySearch}
              className="form__field"
              onChange={(e) => {
                const value = e.target.value;
                setCitySearch(value);
                if (!value) {
                  setSelectedCity(null);
                }
              }}
            />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>

          {/* City list */}
          {cities.length > 0 && (
            <div className="delivery__list">
              {cities.map((city) => {
                const label = city.Present || '';
                const isActive = selectedCity?.Ref === (city.DeliveryCity || city.Ref);
                return (
                  <div
                    key={city.Ref}
                    className={`delivery__item ${isActive ? 'delivery__item--active' : ''}`}
                    onClick={() => {
                      setSelectedCity({ Ref: city.DeliveryCity || city.Ref, Present: label });
                      setCitySearch(label);
                      setErrors((prev) => ({ ...prev, city: '' }));
                    }}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          )}

          {/* Warehouse search */}
          {selectedCity?.Ref && (
            <>
              <p className="delivery__title">Search warehouse</p>
              <div>
                <input
                  placeholder="Search warehouse"
                  value={warehouseSearch}
                  className="form__field"
                  onChange={(e) => {
                    const value = e.target.value;
                    setWarehouseSearch(value);
                    if (!value) {
                      setSelectedWarehouse(null);
                    }
                  }}
                />
                {errors.warehouse && <p className="error">{errors.warehouse}</p>}
              </div>

              {loadingWarehouses && <p>Loading...</p>}
              {!loadingWarehouses && warehouses.length > 0 && (
                <div className="delivery__list">
                  {warehouses.map((w) => {
                    const isActive = selectedWarehouse?.Ref === w.Ref;
                    return (
                      <div
                        key={w.Ref}
                        className={`delivery__item ${isActive ? 'delivery__item--active' : ''}`}
                        onClick={() => {
                          setSelectedWarehouse(w);
                          setWarehouseSearch(w.Description);
                          setErrors((prev) => ({ ...prev, warehouse: '' }));
                        }}
                      >
                        {w.Description}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  </>
);
