import 'portable-fetch';
import React from 'react';
import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
// import { BsmSlider} from '@bsmp/webcomponents-react';
import AppRouter from '../../AppRouter';
import App from '../../App';
import TestPage from './TestPage';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: key => key})
}));

describe('App', () => {
  it('should render TestPage component successfully', () => {
    const { baseElement } = render(
      <RecoilRoot>
        <TestPage />
      </RecoilRoot>
      );
      expect(baseElement).toBeTruthy();
  });

  // it('should render @bsmp/webcomponents-react component successfully', () => {
  //   const { baseElement } = render(<BsmSlider />);
  //   expect(baseElement).toBeTruthy();
  // });
});
