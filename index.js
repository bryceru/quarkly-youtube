import React, { useState, useLayoutEffect } from 'react';
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3'
import atomize from "@quarkly/atomize";
import styled from 'styled-components';

export const isDev = typeof window !== 'undefined' && window.QAPI && window.QAPI.mode === 'development';

const Wrapper = styled.div`
  padding: 5px;
  margin: 5px;
  outline: 2px solid red;
`;

const Wrap = isDev ? Wrapper : styled.div``;

const Recaptcha = ({devApiKey, prodApiKey, ...props}) => {
  const sitekey = isDev ? devApiKey : prodApiKey;
  const [token, setToken] = useState();

  const verifyCallback = (recaptchaToken) => {
    setToken(recaptchaToken);
  };

  useLayoutEffect(() => {
    loadReCaptcha(sitekey);
  }, []);

  return (
    <Wrap>
      { !!isDev && <div>Recaptcha component</div> }
      <ReCaptcha
        sitekey={sitekey}
        action='submit'
        verifyCallback={verifyCallback}
        {...props}
      />
      <input type="hidden" name="g-recaptcha-response" value={token} />
    </Wrap>
  );
};

export default atomize(Recaptcha)({
  name: "Recaptcha",
  normalize: true,
  mixins: true,
  description: {
    en:
      "Recaptcha",
  },
  propInfo: {
    prodApiKey: {
      control: "input"
    },
    devApiKey: {
      control: "input"
    }
  }
});
