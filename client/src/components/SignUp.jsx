import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberInput,
  NumberInputStepper,
  FormErrorMessage,
} from "@chakra-ui/react";
import proto from "../../bundle1";

const SignUp = () => {

  
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <>
      <main className="flex flex-col gap-5 min-h-screen justify-items-center items-center">
        <div
          className="flex flex-col gap-5 border-2 border-gray-600 p-3   rounded-lg"
          style={{ border: "1px solid grey" }}
        >
          <h2 className="text-base text-red-600 text-center font-semibold">
            Sign Up Form
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-[500px] p-4 "
          >
            <FormControl isInvalid={errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                id="name"
                placeholder="name"
                name="name"
                {...register("name", {
                  required: "Name field is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input
                id="email"
                type="email"
                name="email"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              <FormHelperText>We will never share your email.</FormHelperText>
              <FormErrorMessage>
                {errors.name && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="password"
                id="password"
                name="password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.address}>
              <FormLabel>Address</FormLabel>
              <Input
                placeholder="address"
                name="address"
                id="address"
                {...register("address", {
                  required: "address is required",
                })}
              />
              <FormErrorMessage>
                {errors.address && errors.address.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.age}>
              <FormLabel>Age</FormLabel>
              <NumberInput
                max={100}
                min={0}
                name="age"
                {...register("age", {
                  required: "age is required",
                })}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
                <FormErrorMessage>
                  {errors.age && errors.age.message}
                </FormErrorMessage>
              </NumberInput>
            </FormControl>
            <Button type="submit" colorScheme="blue" mt={4}>
              Sign Up
            </Button>
          </form>
        </div>
      </main>
    </>
  );
};

export default SignUp;
