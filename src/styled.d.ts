// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    font: {
      family: string
    },
    sections: {
      padding: string
    }
  }
}
