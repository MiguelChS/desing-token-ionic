import { Story, Meta } from '@storybook/angular/types-6-0';
import { In2TextComponent } from './in2-text.component';

export default {
  title: 'Example/in2Text',
  component: In2TextComponent
} as Meta;

const Template: Story<In2TextComponent> = (args: In2TextComponent) => ({
  props: args,
});

export const Titulo = Template.bind({});
