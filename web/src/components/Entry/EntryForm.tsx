import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useModal } from "../../context/ModalContext";

import Welcome from "./EntryFormWelcome";
import Login from "./EntryFormLogin";
import SignUp from "./EntryFormSignUp";

const VERIFIED = "verified";
const UNVERIFIED = "unverified";

interface FormValues {
  email: string;
  password: string;
  passwordLogin: string;
  firstName: string;
  lastName: string;
  birthday: string;
}

interface Props {
  initialEntry?: string;
  isModal?: boolean;
}

function EntryForm({ initialEntry, isModal = true }: Props) {
  const { entry, setOpen, demoClicked } = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [verified, setVerified] = useState(initialEntry || entry);

  const form = useForm<FormValues>({
    criteriaMode: "all",
  });

  const clickShowPassword = () => {
    setShowPassword((prev: boolean) => !prev);
  };

  const resetForm = (option = { goBack: false }) => {
    const { goBack } = option;
    form.reset();
    setVerified(UNVERIFIED);
    if (!goBack) setOpen(false);
  };

  const handleCloseModal = () => {
    console.log("in fx handleCloseModal");
    setOpen(false);
  };

  // Prevent the user from scrolling when demoClicked is true
  useEffect(() => {
    if (demoClicked) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "hidden";
    };
  }, [demoClicked]);

  // Email validator stage
  if (verified === UNVERIFIED)
    return (
      <Welcome
        form={form}
        setVerified={setVerified}
        handleCloseModal={handleCloseModal}
        isModal={isModal}
      />
    );

  // Email is validated, Password input stage before log in validations
  if (verified === VERIFIED)
    return (
      <Login
        form={form}
        setVerified={setVerified}
        showPassword={showPassword}
        clickShowPassword={clickShowPassword}
        resetForm={resetForm}
        isModal={isModal}
      />
    );

  // Defaults to the sign up form
  return (
    <SignUp
      form={form}
      setVerified={setVerified}
      showHints={showHints}
      setShowHints={setShowHints}
      showPassword={showPassword}
      clickShowPassword={clickShowPassword}
      resetForm={resetForm}
      isModal={isModal}
    />
  );
}

export default EntryForm;
