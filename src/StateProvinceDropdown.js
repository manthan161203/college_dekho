import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

const StateProvinceDropdown = ({ country, setProvince, provinces }) => {
    const handleChange = (event) => {
        setProvince(event.target.value);
    };

    return (
        <FormControl variant="outlined" fullWidth style={{ marginBottom: '20px' }}>
            <InputLabel>Select State/Province</InputLabel>
            <Select value={country} onChange={handleChange} label="Select State/Province">
                {provinces.map((province) => (
                    <MenuItem key={province} value={province}>
                        {province}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default StateProvinceDropdown;
