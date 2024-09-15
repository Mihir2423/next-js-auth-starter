import * as React from "react";

import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import { applicationName } from "@/app-config";

export const BASE_URL = process.env.HOST_NAME;

export function ResetPasswordEmail({ token }: { token: string }) {
  const previewText = `You're been invted to a group!`;
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <React.Fragment>
          <Body className="bg-white mx-auto my-auto font-sans">
            <Container className="border-[#eaeaea] mx-auto my-[40px] pb-[20px] border border-solid rounded w-[465px]">
              <Section className="mt-[32px]">
                <Img
                  // src={`${BASE_URL}/group.jpeg`}
                  src="https://png.pngtree.com/thumb_back/fh260/background/20201104/pngtree-technology-background-binary-computer-code-vector-design-image_458702.jpg"
                  width="160"
                  height="48"
                  alt="StarterKit"
                  className="mx-auto my-0 w-full h-[240px]"
                />
              </Section>

              <Section className="mt-[32px] mb-[32px] px-20 text-center">
                <Text className="mb-8 font-medium text-[14px] text-black leading-[24px]">
                  Click the following link to reset your password
                </Text>

                <Text className="font-medium text-[14px] text-black leading-[24px]">
                  <Link
                    href={`${BASE_URL}/reset-password?token=${token}`}
                    target="_blank"
                    className="bg-black px-6 py-2 rounded-md w-fit text-white"
                  >
                    Reset Password
                  </Link>
                </Text>
              </Section>

              <Hr className="border-[#eaeaea] mx-0 my-[26px] border border-solid w-full" />
              <Section className="px-20 text-center">
                <Text className="flex justify-center items-center text-[#666666] text-[12px] leading-[24px]">
                  © 2024 {applicationName}. All rights reserved.
                </Text>
              </Section>
            </Container>
          </Body>
        </React.Fragment>
      </Tailwind>
    </Html>
  );
}
