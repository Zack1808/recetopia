import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  className?: string;
  disabled?: boolean;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  title?: string;
  required?: boolean;
}

export interface ModalProps {
  children: React.ReactNode;
  handleClose: () => void;
  title?: string;
  isOpen: boolean;
}

export interface CardProps {
  user: string;
  title: string;
  image: string;
  id: string;
}

export interface SelectOptionsProps {
  label: string;
  value: string | number;
}

interface SingleSelectProps {
  onChange: (value: SelectOptionsProps | undefined) => void;
  value?: SelectOptionsProps;
  multiple?: false;
}

interface MultiSelectProps {
  onChange: (value: SelectOptionsProps[]) => void;
  value: SelectOptionsProps[];
  multiple: true;
}

export type SelectProps = {
  options: SelectOptionsProps[];
  title: string;
  placeholder: string;
  name: string;
  required: boolean;
} & (SingleSelectProps | MultiSelectProps);

export interface ListProps {
  list: string[];
  removeItem: (index: number) => void;
}
