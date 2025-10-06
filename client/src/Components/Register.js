import loginImage from "../Images/loginImage.jpg";
import { userSchemaValidation } from "../Validation/UserValidation";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Button,
  Col,
  Container,
  Row,
  Input,
  Form,
} from "reactstrap";
import logo from "../Images/logo-t.png";
import { useSelector } from "react-redux";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchemaValidation) });

  const userList = useSelector((state) => state.users.value);

  const onSubmit = (data) => {
    console.log("Form Data", data); // Handle form submission here
  };

  return (
    <Container>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            Name<br />
            <Input type="text" {...register("name")} />
            <p className="error">{errors.name?.message}</p>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            Email<br />
            <Input type="email" {...register("email")} />
            <p className="error">{errors.email?.message}</p>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            Password<br />
            <Input type="password" {...register("password")} />
            <p className="error">{errors.password?.message}</p>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            Confirm Password<br />
            <Input type="password" {...register("confirmPassword")} />
            <p className="error">{errors.confirmPassword?.message}</p>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Button type="submit">Register</Button>
          </Col>
        </Row>
      </Form>

      <Row>
        <Col md={6}>
          <h1>List of Users</h1>
          <table className="table">
            <tbody>
              {userList && userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  {/* Don't show passwords in production! */}
                  <td>{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
