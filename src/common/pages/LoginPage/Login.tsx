import * as React from "react";
import { connect } from "react-redux";

import {
    Typography,
    Paper,
    Button,
    withStyles,
    TextField,
    Grid,
    InputAdornment,
    FormControl,
    InputLabel,
    Input,
    IconButton
} from "@material-ui/core";

import { Store } from "common/redux/store";

import style from "./LoginPage.style";

import user from "../../../assets/user.svg";
import eye from "../../../assets/eye.svg";
import eyeSlashed from "../../../assets/eye-slashed.svg";

import SVG from "react-inlinesvg";
import { useHistory } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import axios from "axios";

interface LoginProps {
    title: string;
    updateTitle: any;
    classes: any;
    history: any;
}

const Login = (props: LoginProps) => {
    const { classes } = props;

    const [values, setValues] = React.useState({
        username: "",
        password: "",
        showPassword: false
    });

    const handleChange = (prop: any) => (event: any) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const handleSubmit = () => {
        const credentials = {
            user: values["username"],
            password: values["password"]
        };
        console.log(credentials);

        const endpoint = "";

        axios.post(endpoint, credentials).then((res) => {
            if (res.data === "success") {
                localStorage.setItem("authorization", res.data.token);
                props.history.push("/profile");
            } else {
                alert("Auth failed");
            }
        });
    };

    return (
        <React.Fragment>
            <div className={classes.loginContainer}>
                <Typography variant="h3">Account Login</Typography>
                <FormControl className={classes.formField}>
                    <InputLabel htmlFor="user">Username</InputLabel>
                    <Input
                        id="user"
                        type={"text"}
                        value={values.username}
                        onChange={handleChange("username")}
                    />
                </FormControl>
                <FormControl className={classes.formField}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? (
                                        <SVG
                                            src={eye}
                                            width={24}
                                            height="auto"
                                        />
                                    ) : (
                                        <SVG
                                            src={eyeSlashed}
                                            width={24}
                                            height="auto"
                                        />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state: Store) => {
    return {};
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(style)(Login));
