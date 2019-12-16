import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "antd";

import SigninForm from "../components/SigninForm";
import { loginUser } from "../actions/localUserService";

const SigninPage = ({ navigate }) => {
    const dispatch = useDispatch();
    const {
        user,
    } = useSelector((state) => state.localUser);

    const formRef = useRef();

    // Avoid double login
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [navigate, user]);

    const onSubmit = useCallback(() => {
        const { current: form } = formRef;

        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            try {
                dispatch(loginUser(values));
                navigate("/");
            } catch (err) {
                if (err.message === "username") {
                    form.setFields({
                        username: {
                            value: values.username,
                            errors: [new Error("User does not exist")],
                        },
                    });
                } else if (err.message === "password") {
                    form.setFields({
                        password: {
                            value: values.password,
                            errors: [new Error("Wrong username/password combination")],
                        },
                    });
                }
            }
        });
    }, [dispatch, navigate]);

    return (
        <Row
            justify="center"
            type="flex"
        >
            <Col md={12} lg={10} xl={6}>
                <Row>
                    <SigninForm ref={formRef} onSubmit={onSubmit} />
                </Row>
            </Col>
        </Row>
    );
};

export default SigninPage;
