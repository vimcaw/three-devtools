import { Form, Radio } from 'antd';
import { setPreferences, Theme, themeOptions, usePreferences } from './store/perference';

export default function Preferences() {
  const preferences = usePreferences();

  return (
    <Form>
      <Form.Item label="Theme">
        <Radio.Group
          value={preferences.appearance.theme}
          onChange={e => setPreferences({ appearance: { theme: e.target.value as Theme } })}
        >
          {themeOptions.map(item => (
            <Radio key={item.value} value={item.value}>
              {item.name}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </Form>
  );
}
