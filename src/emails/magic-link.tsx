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

export function MagicLinkEmail({ token }: { token: string }) {
  const previewText = `You're been invted to a group!`;
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <React.Fragment>
          <Body className="bg-white mx-auto my-auto font-sans">
            <Container className="border-[#eaeaea] mx-auto my-[40px] p-[20px] border border-solid rounded w-[465px]">
              <Section className="mt-[32px]">
                <Img
                  src={`${BASE_URL}/group.jpeg`}
                  width="160"
                  height="48"
                  alt="StarterKit"
                  className="mx-auto my-0"
                />
              </Section>

              <Section className="mt-[32px] mb-[32px] text-center">
                <Text className="mb-8 font-medium text-[14px] text-black leading-[24px]">
                  You&apos;re magic link login is below, click to login. group.
                </Text>

                <Text className="font-medium text-[14px] text-black leading-[24px]">
                  <Link
                    href={`${BASE_URL}/api/login/magic?token=${token}`}
                    target="_blank"
                    className="text-[#2754C5] underline"
                  >
                    Login using Magic Link
                  </Link>
                </Text>
              </Section>

              <Hr className="border-[#eaeaea] mx-0 my-[26px] border border-solid w-full" />

              <Text className="flex justify-center items-center text-[#666666] text-[12px] leading-[24px]">
                © 2024 {applicationName}. All rights reserved.
              </Text>
            </Container>
          </Body>
        </React.Fragment>
      </Tailwind>
    </Html>
  );
}