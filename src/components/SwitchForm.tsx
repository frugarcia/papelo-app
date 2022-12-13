// Dependencies
import { Controller } from "react-hook-form";
import { FormControl, FormLabel, Switch } from "@chakra-ui/react";

function SwitchForm({ control, name, label }: any) {
  return (
    <FormControl>
      <FormLabel htmlFor={name} fontSize="sm">
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Switch
              size="lg"
              onChange={field.onChange}
              isChecked={field.value}
            />
          );
        }}
      />
    </FormControl>
  );
}

export default SwitchForm;
