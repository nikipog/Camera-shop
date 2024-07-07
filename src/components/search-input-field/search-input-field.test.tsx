import { render, screen, fireEvent } from '@testing-library/react';
import SearchInputField from './search-input-field';
import { withMemoryAndStoreWrapper } from '../../utils/mock-component';
import { State } from '../../types/state';
import { RequestStatus } from '../../const';
import { mockProducts } from '../../utils/mocks';


describe('SearchInputField', () => {
  const initialState: Partial<State> = {
    products: {
      products: mockProducts,
      status: RequestStatus.Success
    },
  };

  it('renders with empty input field initially', () => {
    const { wrappedComponent } = withMemoryAndStoreWrapper(<SearchInputField />, initialState);
    render(wrappedComponent);

    const inputElement = screen.getByPlaceholderText('Поиск по сайту');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });

  it('updates input value and shows results list on input change', () => {
    const { wrappedComponent } = withMemoryAndStoreWrapper(<SearchInputField />, initialState);
    render(wrappedComponent);

    const inputElement = screen.getByPlaceholderText('Поиск по сайту');
    fireEvent.change(inputElement, { target: { value: 'test' } });

    expect(inputElement).toHaveValue('test');
    const resultsList = screen.getByRole('list');
    expect(resultsList).toBeInTheDocument();
  });

});
