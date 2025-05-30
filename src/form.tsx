import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Checkbox } from "./components/ui/checkbox";
import { FormInput } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { WithLabel } from "./components/ui/with-label";
const PROVINCES = [
  "AB",
  "BC",
  "MB",
  "NB",
  "NL",
  "NT",
  "NS",
  "NU",
  "ON",
  "PE",
  "QC",
  "SK",
  "YT",
];

export function Form() {
  const methods = useForm({
    mode: "all",
    // resolver: zodResolver(schema),
  });
  const onSubmit = async () => {
    // simulating a server request
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Your message was successfully sent!");
  };
  return (
    <Card className="gap-2 w-full max-w-[500px]">
      <CardHeader>
        <CardTitle>Form</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <InputPair>
              <FormInput
                // {...methods.register("firstName")}
                required
                label="First Name"
                id="firstName"
                name="firstName"
                placeholder="John"
              />
              <FormInput
                // {...methods.register("lastName")}
                required
                label="Last Name"
                id="lastName"
                name="lastName"
                placeholder="John"
              />
            </InputPair>
            <FormInput
              //   {...methods.register("address")}
              required
              label="Street Address"
              id="address"
              name="address"
              placeholder="123 Main St"
            />
            <InputPair>
              <FormInput
                // {...methods.register("city")}
                required
                label="City"
                id="city"
                name="city"
                placeholder="Regina"
              />
              <FormInput
                // {...methods.register("postalCode")}
                required
                label="Postal Code"
                id="postalCode"
                name="postalCode"
                placeholder="A1A1A1"
              />
            </InputPair>
            <WithLabel label="Province" id="province">
              <Select required name="province">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your province..." />
                </SelectTrigger>
                <SelectContent>
                  {PROVINCES.map((province) => (
                    <SelectItem value={province}>{province}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </WithLabel>
            <InputPair>
              <FormInput
                // {...methods.register("email")}
                required
                label="E-mail"
                id="email"
                name="email"
                placeholder="john.doe@gmail.com"
              />
              <FormInput
                // {...methods.register("phone")}
                required
                label="Phone Number"
                id="phone"
                name="phone"
                placeholder="123-456-7890"
              />
            </InputPair>
            <ContactMethod />
            <div className="flex gap-2 items-center mt-1">
              <Checkbox id="newsletterOptedIn" name="newsletterOptedIn" />
              <Label htmlFor="newsletterOptedIn">Receive Newsletter</Label>
            </div>

            <Button className="w-full py-2">Submit</Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
function InputPair({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{children}</div>
  );
}
const CONTACT_METHODS = [
  { label: "SMS", value: "sms" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
];
function ContactMethod() {
  return (
    <WithLabel
      id="contactMethod"
      label="Preferred Contact Method"
      className="gap-2"
    >
      <RadioGroup required name="contactMethod">
        {CONTACT_METHODS.map(({ label, value }) => {
          const radioId = `contactMethod-${value}`;
          return (
            <div className="flex items-center gap-3">
              <RadioGroupItem value={value} id={radioId} />
              <Label htmlFor={radioId}>{label}</Label>
            </div>
          );
        })}
      </RadioGroup>
    </WithLabel>
  );
}
