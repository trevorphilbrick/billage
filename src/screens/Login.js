import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { authContext, UserContext } from "../App";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
`;
const LoginFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 300px;
  background-color: #00293d;
  padding: 32px 0;
  border-radius: 4px;
`;
const Screen = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  margin-top: 8px;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: hidden;
  background-color: #002233;
  padding: 8px;
  color: #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #52b788;
  padding: 8px;
  margin: 16px 0 0 0;
  width: 100%;
  color: #333;
  font-weight: bolder;
  border-radius: 4px;
  border: none;
  &:active {
    background-color: #899971;
  }
`;
const CreateAccountButton = styled.button`
  background-color: #00293d;
  padding: 8px;
  margin: 16px 0 0 0;
  color: #ccc;
  font-weight: bolder;
  border-radius: 4px;
  border: none;
  &:active {
    background-color: #899971;
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const auth = useContext(authContext);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }) => {
      try {
        await setPersistence(auth, browserSessionPersistence);
        await signInWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            // TODO: refactor to jsut use session token and keep uid
            setUser(userCredential.user);
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
  });

  const createUser = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        formikLogin.values.email,
        formikLogin.values.password
      ).then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Screen>
      <LoginFormWrapper>
        <img
          src={require("../resources/logo.png")}
          style={{ width: 185 / 2, height: 85 / 2, marginBottom: 16 }}
        />
        <LoginForm onSubmit={formikLogin.handleSubmit}>
          <StyledInput
            name="email"
            type="email"
            placeholder="email"
            value={formikLogin.values.email}
            onChange={formikLogin.handleChange}
          />
          <StyledInput
            type="password"
            name="password"
            placeholder="password"
            value={formikLogin.values.password}
            onChange={formikLogin.handleChange}
          />
          <SubmitButton type="submit">Log in</SubmitButton>
          <CreateAccountButton onClick={() => createUser()}>
            Create an account
          </CreateAccountButton>
        </LoginForm>
      </LoginFormWrapper>
    </Screen>
  );
}
