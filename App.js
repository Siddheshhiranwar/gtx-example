import React, { useState } from 'react';
import './App.css';

const initialProperties = [
  { id: 1, name: 'Property A', location: 'Location A', tenants: [] },
  { id: 2, name: 'Property B', location: 'Location B', tenants: [] },
  { id: 3, name: 'Property C', location: 'Location C', tenants: [] },
];

const App = () => {
  const [properties, setProperties] = useState(initialProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
  };

  const handleTenantAdd = (tenantName) => {
    if (selectedProperty) {
      const updatedProperties = properties.map((property) =>
        property.id === selectedProperty.id
          ? { ...property, tenants: [...property.tenants, tenantName] }
          : property
      );
      setProperties(updatedProperties);
    }
  };

  const handleTenantRemove = (tenantName) => {
    if (selectedProperty) {
      const updatedProperties = properties.map((property) =>
        property.id === selectedProperty.id
          ? { ...property, tenants: property.tenants.filter((tenant) => tenant !== tenantName) }
          : property
      );
      setProperties(updatedProperties);
    }
  };

  return (
    <div className="app">
      <div className="properties-list">
        <h2>Properties</h2>
        <ul>
          {properties.map((property) => (
            <li key={property.id} onClick={() => handlePropertyClick(property)}>
              {property.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="property-details">
        {selectedProperty ? (
          <div>
            <h2>Property Details</h2>
            <h3>{selectedProperty.name}</h3>
            <p>Location: {selectedProperty.location}</p>
            <h3>Tenants</h3>
            <ul>
              {selectedProperty.tenants.map((tenant) => (
                <li key={tenant}>
                  {tenant}{' '}
                  <button onClick={() => handleTenantRemove(tenant)}>Remove</button>
                </li>
              ))}
            </ul>
            <TenantForm onTenantAdd={handleTenantAdd} />
          </div>
        ) : (
          <p>Select a property to view details.</p>
        )}
      </div>
    </div>
  );
};

const TenantForm = ({ onTenantAdd }) => {
  const [tenantName, setTenantName] = useState('');

  const handleAddTenant = () => {
    if (tenantName.trim() !== '') {
      onTenantAdd(tenantName);
      setTenantName('');
    }
  };

  return (
    <div className="tenant-form">
      <input
        type="text"
        placeholder="Enter tenant name"
        value={tenantName}
        onChange={(e) => setTenantName(e.target.value)}
      />
      <button onClick={handleAddTenant}>Add Tenant</button>
    </div>
  );
};

export default App;