import { useState } from "react";
import style from "./App.module.scss";
import { FormInput } from "./components/FormInput";
import { decrypt, encrypt } from "./utils/encrypt";

function App() {
  const [userState, setUserState] = useState({
    email: "",
    password: "",
  });

  const [state, setState] = useState({
    encryptedPassword: "",
    encryptedEmail: "",

    serverPassword: "",
    serverEmail: "",

    decryptedPassword: "",
    decryptedEmail: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = userState;
    const encryptedEmail = encrypt(email);
    const encryptedPassword = encrypt(password);
    if (!encryptedPassword || !encryptedEmail) return;

    const res = await (
      await fetch("http://localhost:8080/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: encryptedEmail,
          password: encryptedPassword,
        }),
      })
    ).json();

    const serverEmail = res.email;
    const serverPassword = res.password;

    const decryptedEmail = decrypt(serverEmail);
    const decryptedPassword = decrypt(serverPassword);

    if (!decryptedEmail || !decryptedPassword) return;

    setState({
      ...state,
      encryptedPassword,
      encryptedEmail,
      serverEmail,
      serverPassword,
      decryptedEmail,
      decryptedPassword,
    });

    //scroll to bottom
    window.scrollTo({
      top: document.getElementById("submitResult")?.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className={style["root"]}>
        <form className={style["form"]} onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            value={userState.email}
            onChange={(event) =>
              setUserState({ ...userState, email: event.target.value })
            }
          />
          <FormInput
            label="Password"
            type="password"
            value={userState.password}
            onChange={(event) =>
              setUserState({ ...userState, password: event.target.value })
            }
          />

          <button type="submit" className={style["submit"]}>
            Submit
          </button>
        </form>
      </div>

      <section className={style["scheme"]} id="submitResult">
        <CardContent
          title="User entered:"
          email={userState.email}
          password={userState.password}
        />

        <CardContent
          title="Client app sent:"
          email={state.encryptedEmail}
          password={state.encryptedPassword}
        />

        <CardContent
          title="Server received:"
          email={state.serverEmail}
          password={state.serverPassword}
        />

        <CardContent
          title="Client can decrypt with private key:"
          email={state.decryptedEmail}
          password={state.decryptedPassword}
        />
      </section>
    </>
  );
}

const CardContent = ({
  title,
  email,
  password,
}: {
  title: string;
  email: string;
  password: string;
}) => {
  return (
    <div className={style["scheme__item"]}>
      <div>
        <h2>{title}</h2>
        <h3>Email:</h3>
        <p>{email}</p>
        <h3>Password:</h3>
        <p>{password}</p>
      </div>
    </div>
  );
};

const Arrow = () => {
  //arrow down
  return (
    <div className={style["scheme__arrow"]}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M12 5v14l8-8z" />
      </svg>
    </div>
  );
};

export default App;
