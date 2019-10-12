import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({ label: '', key: 'hai' });


  const handleChange = event => {
    props.onSearch(event.target.value);
    setValues({ [event.target.name]: event.target.value });
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">Age</InputLabel>
        <Select
          value={values.label}
          onChange={handleChange}
          inputProps={{
            name: 'label',
            id: 'node-simple',
          }}
        >
          {props.options.map(({ key, label }) => (
            <MenuItem  key={`key${key}`} value={key}>{label}</MenuItem>
          )
          )}
        </Select>
      </FormControl>
    </form>
  );
}
