import {
  Button,
  ButtonGroup,
  Content,
  Divider,
  Heading,
  Radio,
  RadioGroup,
} from '@adobe/react-spectrum';
import { setPreferences, Theme, themeOptions, usePreferences } from './store/perference';

export default function Preferences({ close }: { close: () => void }) {
  const preferences = usePreferences();

  return (
    <>
      <Heading>Reference</Heading>
      <Divider />
      <Content>
        <RadioGroup
          label="Theme"
          value={preferences.appearance.theme}
          onChange={value => setPreferences({ appearance: { theme: value as Theme } })}
        >
          {themeOptions.map(item => (
            <Radio key={item.value} value={item.value}>
              {item.name}
            </Radio>
          ))}
        </RadioGroup>
      </Content>
      <ButtonGroup>
        <Button variant="accent" onPress={close}>
          Close
        </Button>
      </ButtonGroup>
    </>
  );
}
