import React, { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const BankSearch = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [bankList, setBankList] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [error, setError] = useState(false);

    const handleInputChange = (e) => {
        const input = e.target.value;
        setSearchQuery(input);
        setError(false);
        if (input.length > 0) {
            searchInstitutions(input);
            setShowSearch(true);
        } else {
            setShowSearch(false);
        }
    };

    const searchInstitutions = async (input) => {
        try {
            const response = await axios.get('https://banks.data.fdic.gov/api/institutions', {
                params: {
                    search: `NAME:${input}`,
                    limit: 10, // Limit the results to 10 banks
                    fields: 'NAME'
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('NAME:', input, response.data.data)
            setBankList(response.data.data);
        } catch (error) {
            console.error('Error fetching institutions:', error);
        }
    };

    const handleBlur = () => {
        if (searchQuery === '') {
            setError(true);
            return;
        }
        setTimeout(() => {
            setShowSearch(false);
            props.handleBankInput(searchQuery)
        }, 200);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchQuery.length > 0) {
            searchInstitutions(searchQuery);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <TextField
                    label="Bank &#x1F50E;"
                    variant="outlined"
                    className="text"
                    placeholder="Search for banks"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    sx={{width:"100%"}}
                    error={error}
                    helperText={error && "Please select a bank"}
                />
            </form>
            <Card className="search">
                {showSearch &&
                    bankList.map((bank, index) => (
                        <Typography key={index} variant="body2" onClick={() => setSearchQuery(bank.data.NAME)} component="div">
                            {bank.data.NAME} ({bank.data.ID})
                        </Typography>
                    ))}
            </Card>
        </div>
    );
};

export default BankSearch;
