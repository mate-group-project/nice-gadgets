import { novaPoshtaApi } from '@/shared/api/novaPoshta';
import { useEffect, useRef, useState } from 'react';

import './CheckoutForm.scss'
import { Dropdown } from '@/shared/components/Dropdown';
import { useStores } from '@/shared/hooks/useStoresList';

type DeliveryType = 'pickup' | 'delivery';

type City = {
  Ref: string;
  DeliveryCity?: string;
  Present?: string;
  Description?: string;
  MainDescription?: string;
};

type Warehouse = {
  Ref: string;
  Description: string;
};

interface SearchSettlementsResponse {
  data: {
    Addresses?: City[];
  }[];
};

interface GetWarehousesResponse {
  data: Warehouse[];
};

export const CheckoutForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [deliveryType, setDeliveryType] = useState<DeliveryType>('pickup');
  const [storeId, setStoreId] = useState('');

  // cities
  const [citySearch, setCitySearch] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  // warehouses
  const [warehouseSearch, setWarehouseSearch] = useState('');
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [loadingWarehouses, setLoadingWarehouses] = useState(false);

  // errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const firstErrorRef = useRef<HTMLDivElement | null>(null);

  // get stores list from API
  const { stores } = useStores();

  const storeOptions = stores.map((store) => ({
    label: store.name,
    value: String(store.id),
  }));

  // form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  // SEARCH CITIES
  useEffect(() => {
    if (!citySearch || deliveryType !== 'delivery') return;

    const timeout = setTimeout(() => {
      novaPoshtaApi
        .searchSettlements<SearchSettlementsResponse>(citySearch)
        .then((res) => {
          const list = res.data?.[0]?.Addresses || [];
          setCities(list);
        })
        .catch(console.error);
    }, 300);

    return () => clearTimeout(timeout);
  }, [citySearch, deliveryType]);

  // GET WAREHOUSES
  useEffect(() => {
    if (!selectedCity?.Ref) return;

    const resetWarehouses = () => {
      setWarehouses([]);
      setSelectedWarehouse(null);
      setWarehouseSearch('');
      setLoadingWarehouses(true);
    };

    resetWarehouses();

    novaPoshtaApi
      .getWarehouses<GetWarehousesResponse>(selectedCity.Ref)
      .then((res) => {
        setWarehouses(res.data || []);
      })
      .catch(console.error)
      .finally(() => setLoadingWarehouses(false));
  }, [selectedCity?.Ref]);

  // SUBMIT
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validate();

  if (!isValid) {
    scrollToFirstError();
    return;
  }

    const order = {
      customer: form,
      delivery: {
        type: deliveryType,
        ...(deliveryType === 'pickup'
          ? { storeId }
          : {
              city: selectedCity?.Present,
              cityRef: selectedCity?.Ref,
              warehouse: selectedWarehouse?.Description,
              warehouseRef: selectedWarehouse?.Ref,
            }),
      },
    };

    console.log('ORDER:', order);
  };

  // form validation
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (form.phone.length < 10) {
      newErrors.phone = 'Phone is too short';
    }

    if (deliveryType === 'delivery') {
      if (!selectedCity?.Ref) {
        newErrors.city = 'Select city';
      }

      if (!selectedWarehouse?.Ref) {
        newErrors.warehouse = 'Select warehouse';
      }
    }

    if (deliveryType === 'pickup' && !storeId) {
      newErrors.store = 'Select store';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // scroll form to error place
  const scrollToFirstError = () => {
    setTimeout(() => {
      firstErrorRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 0);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className='order_form'
    >
      {/*  CUSTOMER */}
      <h2>Contact information</h2>

      <div className="field">
        <input 
          name="firstName" 
          placeholder="First name" 
          onChange={handleChange}
          className="form__field"
        />
        {errors.firstName && <p 
          className="error"
          ref={errors.firstName ? firstErrorRef : null}
        >{errors.firstName}</p>}
      </div>
            
      <div className="field">
        <input 
          name="lastName" 
          placeholder="Last name" 
          onChange={handleChange}
          className="form__field"
        />
        {errors.lastName && <p className="error">{errors.lastName}</p>}
      </div>

      <div className="field">
        <input 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          className="form__field"
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      
      <div className="field">
        <input 
          name="phone" 
          placeholder="Phone" 
          onChange={handleChange} 
          className="form__field"
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>

      {/*  DELIVERY */}
      <h2>Delivery method</h2>

      <div className='delivery__method'>
        <label
          className={`radio__item ${
            deliveryType === 'pickup' ? 'radio__item--active' : ''
          }`}
        >
          <input
            type="radio"
            className="radio__input"
            checked={deliveryType === 'pickup'}
            onChange={() => setDeliveryType('pickup')}
          />

          <span className="radio__label">Pickup (store)</span>
        </label>

        {deliveryType === 'pickup' && (
          <div className='delivery__dropdown'>
            <Dropdown
              label="Select store"
              value={storeId}
              options={storeOptions}
              onChange={(value) => {
                setStoreId(value);

                setErrors((prev) => ({
                  ...prev,
                  store: '',
                }));
              }}
            />
            {errors.store && <p className="error">{errors.store}</p>}
          </div>
        )}
      </div>
      
      <div className='delivery__method'>
        <label
          className={`radio__item ${
            deliveryType === 'delivery' ? 'radio__item--active' : ''
          }`}
        >
          <input
            type="radio"
            className="radio__input"
            checked={deliveryType === 'delivery'}
            onChange={() => setDeliveryType('delivery')}
          />
          
          <span className="radio__label">Nova Poshta delivery</span>
        </label>

        {deliveryType === 'delivery' && (
          <div className='delivery__dropdown'>
            {/* CITY SEARCH */}
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
                    setCities([]);
                  }
                }}
              />

              {errors.city && <p className="error">{errors.city}</p>}
            </div>

            {/* CITY LIST */}
            {cities.length > 0 && (
              <div className="delivery__list">
                {cities
                  .filter((c) =>
                    (c.Present || '').toLowerCase().includes(citySearch.toLowerCase())
                  )
                  .map((city) => {
                    const label = city.Present || '';

                    const isActive =
                      selectedCity?.Ref === (city.DeliveryCity || city.Ref);

                    return (
                      <div
                        key={city.Ref}
                        className={`delivery__item ${
                          isActive ? 'delivery__item--active' : ''
                        }`}
                        onClick={() => {
                          setSelectedCity({
                            Ref: city.DeliveryCity || city.Ref,
                            Present: label,
                          });

                          setCitySearch(label);
                        }}
                      >
                        {label}
                      </div>
                    );
                  })}
              </div>
            )}

            {/* WAREHOUSE SEARCH */}
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

                  {errors.warehouse && (
                    <p className="error">{errors.warehouse}</p>)}
                </div>

                {loadingWarehouses && <p>Loading...</p>}

                {!loadingWarehouses && warehouses.length > 0 && (
                  <div className="delivery__list">
                    {warehouses
                      .filter((w) =>
                        w.Description.toLowerCase().includes(
                          warehouseSearch.toLowerCase()
                        )
                      )
                      .map((w) => {
                        const isActive = selectedWarehouse?.Ref === w.Ref;

                        return (
                          <div
                            key={w.Ref}
                            className={`delivery__item ${
                              isActive ? 'delivery__item--active' : ''
                            }`}
                            onClick={() => {
                              setSelectedWarehouse(w);
                              setWarehouseSearch(w.Description);
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

      {/* SUBMIT */}
      <button 
        type="submit" 
        className="button"
        style={{ width: '180px' }}
      >
        Place order
      </button>
    </form>
  );
};
