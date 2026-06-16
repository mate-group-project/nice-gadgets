import { novaPoshtaApi } from '@/shared/api/novaPoshta';
import { useEffect, useState } from 'react';

import './CheckoutForm.scss'

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
  const [storeId, setStoreId] = useState('kyiv-1');

  // cities
  const [citySearch, setCitySearch] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  // warehouses
  const [warehouseSearch, setWarehouseSearch] = useState('');
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [loadingWarehouses, setLoadingWarehouses] = useState(false);

  // form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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

    const order = {
      customer: form,
      delivery: {
        type: deliveryType,
        ...(deliveryType === 'pickup'
          ? { storeId }
          : {
              city: selectedCity?.Present || selectedCity?.Description,
              cityRef: selectedCity?.Ref,
              warehouse: selectedWarehouse?.Description,
              warehouseRef: selectedWarehouse?.Ref,
            }),
      },
    };

    console.log('ORDER:', order);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/*  CUSTOMER */}
      <h2>Contact information</h2>
      <input name="firstName" placeholder="First name" onChange={handleChange} />
      <input name="lastName" placeholder="Last name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />

      {/*  DELIVERY */}
      <h2>Delivery method</h2>

      <div className='pickup'>
        <label>
          <input
            type="radio"
            checked={deliveryType === 'pickup'}
            onChange={() => setDeliveryType('pickup')}
          />
          Pickup (store)
        </label>

        {deliveryType === 'pickup' && (
          <div>
            <h3>Select store</h3>
            <select value={storeId} onChange={(e) => setStoreId(e.target.value)}>
              <option value="kyiv-1">Kyiv Store #1</option>
              <option value="lviv-1">Lviv Store #1</option>
              <option value="odesa-1">Odesa Store #1</option>
            </select>
          </div>
        )}
      </div>
      
      <div className='delivery'>
        <label>
          <input
            type="radio"
            checked={deliveryType === 'delivery'}
            onChange={() => setDeliveryType('delivery')}
          />
          Nova Poshta delivery
        </label>

        {deliveryType === 'delivery' && (
          <div>
            <h3>Nova Poshta delivery</h3>

            {/* CITY SEARCH */}
            <input
              placeholder="Search city"
              value={citySearch}
              className='search'
              onChange={(e) => {
                const value = e.target.value;
                setCitySearch(value);
                if (value === '') {
                  setSelectedCity(null);
                  setCities([]);
                }
              }}
            />

            {/* CITY LIST */}
            {cities.length > 0 && (
              <div style={{ border: '1px solid #ccc', maxHeight: '200px', overflowY: 'auto' }}
              className='111'>
                {cities
                  .filter((c) =>
                    (c.Present || c.Description || '')
                      .toLowerCase()
                      .includes(citySearch.toLowerCase())
                  )
                  .map((city) => (
                    <div
                      key={city.Ref}
                      onClick={() => {
                        setSelectedCity({
                          Ref: city.DeliveryCity || city.Ref,
                          Present: city.Present || city.Description,
                        });
                        setCitySearch(city.Present || city.Description || '');
                      }}
                      style={{
                        padding: '4px',
                        cursor: 'pointer',
                        backgroundColor: selectedCity?.Ref === (city.DeliveryCity || city.Ref) ? '#eee' : 'white',
                      }}
                    >
                      {city.Present || city.Description}
                    </div>
                  ))}
              </div>
            )}

            {/* WAREHOUSE SEARCH */}
            {selectedCity?.Ref && (
              <div>
                <h4>Search warehouse</h4>
                <input
                  placeholder="Search warehouse"
                  value={warehouseSearch}
                  className='search'
                  onChange={(e) => {
                    const value = e.target.value;
                    setWarehouseSearch(value);
                    if (value === '') {
                      setSelectedWarehouse(null);
                    }
                  }}
                />

                {loadingWarehouses && <p>Loading...</p>}

                {!loadingWarehouses && warehouses.length > 0 && (
                  <div style={{ border: '1px solid #ccc', maxHeight: '200px', overflowY: 'auto' }}>
                    {warehouses
                      .filter((w) =>
                        w.Description.toLowerCase().includes(warehouseSearch.toLowerCase())
                      )
                      .map((w) => (
                        <div
                          key={w.Ref}
                          onClick={() => {
                            setSelectedWarehouse(w);
                            setWarehouseSearch(w.Description);
                          }}
                          style={{
                            padding: '4px',
                            cursor: 'pointer',
                            backgroundColor: selectedWarehouse?.Ref === w.Ref ? '#eee' : 'white',
                          }}
                        >
                          {w.Description}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* SUBMIT */}
      <button type="submit">Place order</button>
    </form>
  );
};
