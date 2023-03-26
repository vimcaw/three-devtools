import { Button, Modal } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { ComponentProps, useState } from 'react';
import Preferences from '../Peferences';

export default function PreferencesButton({
  buttonProps = {},
}: {
  buttonProps?: ComponentProps<typeof Button>;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <Button
        type="text"
        icon={<SettingOutlined />}
        onClick={() => setIsModalVisible(true)}
        {...buttonProps}
      />
      <Modal
        title="Preferences"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <Preferences />
      </Modal>
    </>
  );
}
