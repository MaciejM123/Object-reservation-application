import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import {Avatar, Box, Button, Container, FormControlLabel, Grid, TextField, Typography,} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Spinner from '../UI/Spinner';

import * as userActions from '../../store/actions/index';

import useStyles from './styles';
import {Form, Formik} from "formik";
import {userProfileEdit} from "../../constants/validation/validationSchema";
import {userProfileTransform} from "../../constants/validation/initialValuesValidation";

const UserProfile = ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [sex, setSex] = useState('');
    const [id, setId] = useState('');
    const [role, setRole] = useState('');
    const [isStudent, setIsStudent] = useState(false);
    const [nip, setNIP] = useState('');
    const userProfile = useSelector(state => state.userProfile.user);
    const isLoading = useSelector(state => state.utils.isLoading);

    useEffect(() => {
        if (!userProfile) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch(userActions.getUserProfileStart(user._id));
        }
        if (userProfile) {
            setId(userProfile._id);
            setName(userProfile.name);
            setSurname(userProfile.surname);
            setEmail(userProfile.email);
            setPhoneNumber(userProfile.phone_number);
            setAge(userProfile.age);
            setCity(userProfile.adress_city);
            setStreet(userProfile.adress_street);
            setPostalCode(userProfile.adress_postalCode);
            setSex(userProfile.sex);
            setRole(userProfile.role);
            setIsStudent(userProfile.isStudent);
            setNIP(userProfile.nip);
        }
    }, [dispatch, userProfile]);



    return isLoading ? (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Spinner/>
        </Container>
    ) : (
        <Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonPinIcon/>
                    </Avatar>
                    <Typography
                        style={{fontFamily: 'roboto'}}
                        component="h1"
                        variant="h5"
                    >
                        Profil użytkownika
                    </Typography>
                    <form className={classes.form} noValidate autoComplete="off">
                        <Formik
                            enableReinitialize
                            initialValues={userProfile ? userProfileTransform(userProfile) : null}
                            // validationSchema={userProfileEdit}
                            onSubmit={(values, actions) => {
                                dispatch(userActions.updateUserProfileStart(values, history));
                                dispatch(userActions.updateAuthUserStart(values));
                                alert(JSON.stringify(values, null, 2));
                                actions.setSubmitting(false);
                            }}
                            render={({handleSubmit, handleChange, handleBlur, errors}) => (
                                <Form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                disabled={isStudent}
                                                required
                                                fullWidth
                                                id="name"
                                                label="Imię"
                                                name="name"
                                                value={name}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                disabled={isStudent}
                                                required
                                                fullWidth
                                                id="surname"
                                                label="Nazwisko"
                                                name="surname"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={surname}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                disabled={isStudent}
                                                required
                                                fullWidth
                                                name="email"
                                                label="E-mail"
                                                id="email"
                                                type='email'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={email}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="phoneNumber"
                                                type='number'
                                                label="Numer telefonu"
                                                id="phoneNumber"
                                                helperText={errors.phoneNumber}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={phoneNumber}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="age"
                                                label="Wiek"
                                                type='number'
                                                id="age"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={age}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="city"
                                                label="Miasto"
                                                id="city"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={city}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="postalCode"
                                                helperText={errors.postalCode}
                                                label="Kod pocztowy"
                                                id="postalCode"
                                                type='number'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={postalCode}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="street"
                                                label="Ulica"
                                                id="street"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={street}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="NIP"
                                                label="NIP"
                                                id="NIP"
                                                type={'number'}
                                                helperText={errors.nip}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={nip}
                                            />
                                        </Grid>
                                        <FormControl>
                                            <FormLabel>Płeć</FormLabel>
                                            <RadioGroup
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={sex}
                                            >
                                                <FormControlLabel
                                                    disabled={isStudent}
                                                    value="female"
                                                    control={<Radio/>}
                                                    label="Kobieta"
                                                />
                                                <FormControlLabel
                                                    disabled={isStudent}
                                                    value="male"
                                                    control={<Radio/>}
                                                    label="Mężczyzna"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        type="submit"
                                    >
                                        Zapisz
                                    </Button>
                                </Form>
                            )}
                        />
                    </form>
                </div>
                <Box mt={5}/>
            </Container>
        </Fragment>
    );
};

export default UserProfile;
