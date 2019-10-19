import React, { useEffect, useState }   from 'react';
import PropTypes                        from 'prop-types';
import Button                           from '@material-ui/core/Button';
import clsx                             from 'clsx';
import CloseIcon                        from '@material-ui/icons/Close';
import CheckCircleIcon                  from '@material-ui/icons/CheckCircle';
import ErrorIcon                        from '@material-ui/icons/Error';
import IconButton                       from '@material-ui/core/IconButton';
import InfoIcon                         from '@material-ui/icons/Info';
import { makeStyles }                   from '@material-ui/core/styles';
import SnackbarContent                  from '@material-ui/core/SnackbarContent';
import WarningIcon                      from '@material-ui/icons/Warning';
import { amber, green, grey }           from '@material-ui/core/colors';
import { white }                        from 'ansi-colors';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
    display: 'flex',
    marginLeft: '4px',
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 0 0 12px !important',
  },
  root: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    padding: '10px 0 10px 0',

  },
  action: {
    margin: '0',
    padding: '0',
  },
  btn: {
    margin: '0 2px 0 2px !important',
    padding: '0 2px 0 2px  !important',
    minWidth: '32px !important',
    color: white,
  },
  actionBased: {
    padding: ' 10px 10px 10px 10px',
    backgroundColor: grey[400]
  }
}));

export function SimpleSnackBar(props) {
  const {
    anchor, className, variant,
    message,
    open,
    ...other
  } = props;

  const classes = useStyles1();

  const Icon = variantIcon[variant];

  const [display, setDisplay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {  
      onClose();
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const onClose = () => {
    setDisplay(false);
    props.onClose();
  }

  return display ? (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      classes={{
        root: classes.root,
        action: classes.action,
      }}
      aria-describedby="client-snackbar"
      anchororigin={{
        vertical:   anchor ? anchor.vertical   : 'bottom',
        horizontal: anchor ? anchor.horizontal : 'right',
      }}
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
        key="close"
        aria-label="close"
        color="inherit"
        onClick={onClose}
      >
        <CloseIcon className={classes.icon} />
      </IconButton>,
      ]}
      {...other}
    />
  ) : null;
}

export function ActionBasedSnackBar(props) {
  const {
    anchor, className, variant,
    acceptBtnLabel, cancelBtnLabel, message,
    handleAccept, handleCancel,
    ...other
  } = props;


  const [display, setDisplay] = useState(true);

  const classes = useStyles1();

  useEffect(() => {
    const timer = setTimeout(() => {  
      setDisplay(false);
      handleCancel();
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const onAccept = () => {
    setDisplay(false);
    handleAccept();
  }

  const onCancel = () => {
    setDisplay(false);
    handleCancel();
  }

  return display ? (
    <SnackbarContent
      className={clsx(classes.info, className)}
      classes={{
        root: clsx(classes.actionBased, classes.root),
        action: classes.action,
      }}
      aria-describedby="client-snackbar"
      anchororigin={{
        vertical:   anchor ? anchor.vertical   : 'bottom',
        horizontal: anchor ? anchor.horizontal : 'right',
      }}
      message={
        <span id="client-snackbar" className={classes.message}>
          {message}
        </span>
      }
      action={[
        handleAccept && <Button
          className={classes.btn}
          variant="contained" 
          color="secondary"
          key="accept"
          size="small"
          onClick={onAccept}
        >
          {acceptBtnLabel || ok}
        </Button>,
        handleCancel && <Button
          className={classes.btn}
          key="cancel"
          variant="contained" 
          color="secondary"
          size="small"
          onClick={onCancel}
        >
          {cancelBtnLabel || ok}
        </Button>,
      ]}
      {...other}
    />
  ) : null;
}

SimpleSnackBar.propTypes = {
  anchor:    PropTypes.object,
  className: PropTypes.string,
  message:   PropTypes.string.isRequired,
  onClose:   PropTypes.func,
  variant:   PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};


ActionBasedSnackBar.propTypes = {
  anchor:         PropTypes.object,
  acceptBtnLabel: PropTypes.string,
  cancelBtnLabel: PropTypes.string,
  className:      PropTypes.string,
  handleAccept:   PropTypes.func.isRequired,
  handleCancel:   PropTypes.func.isRequired,
  message:        PropTypes.string.isRequired,
};
