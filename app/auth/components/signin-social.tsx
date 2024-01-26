import DialogCloseButton from "./phone-dialog";
import SigninGoogle from "./signin-google";
import SigninGithub from "./signin-github";

const SigninSocial = () => {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <SigninGithub />
      <SigninGoogle />
      <DialogCloseButton />
    </div>
  );
};

export default SigninSocial;
