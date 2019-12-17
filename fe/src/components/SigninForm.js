import React, { useCallback, forwardRef, useImperativeHandle } from "react";
import { Form, Icon, Input, Checkbox, Button } from "antd";

const SigninForm = ({ onSubmit, form, ref }) => {

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onSubmit(e);
    }, [onSubmit]);

    const { getFieldDecorator } = form;

    useImperativeHandle(ref, () => ({ form }));

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Item>
                {getFieldDecorator("username", {
                    rules: [{ required: true, message: "Please input your username!" }],
                })(
                    <Input
                        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                        placeholder="Username"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator("password", {
                    rules: [{ required: true, message: "Please input your Password!" }],
                })(
                    <Input
                        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                        type="password"
                        placeholder="Password"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator("rememberMe", {
                    valuePropName: "checked",
                    initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                        Sign in
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Form.create({ name: "signin" })(forwardRef(SigninForm));
