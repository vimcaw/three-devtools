import {
  ActionButton,
  Dialog,
  DialogTrigger,
  SpectrumActionButtonProps,
} from '@adobe/react-spectrum';
import Settings from '@spectrum-icons/workflow/Settings';
import Preferences from '../Peferences';

export default function PreferencesButton(props: SpectrumActionButtonProps) {
  return (
    <DialogTrigger>
      <ActionButton isQuiet {...props}>
        <Settings />
      </ActionButton>
      {close => (
        <Dialog>
          <Preferences close={close} />
        </Dialog>
      )}
    </DialogTrigger>
  );
}
