import type { store } from '../store';

//Оператор ReturnType выводит тип из значения, возвращаемого функцией
//в данном случае метод .getState - возвращает текущее состояние хранилища

type RootState = ReturnType<typeof store.getState>;

//dispatch принимает объекты action и передает их в reducer
//в разных проектах он разный, поэтому тип выводим динамически

type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch};

