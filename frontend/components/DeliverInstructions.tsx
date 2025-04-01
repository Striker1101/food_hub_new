// components/InstructionItem.tsx
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface InstructionItemProps {
  id: string;
  name: string;
  iconName: string;
  isSelected: boolean;
  toggleInstruction: (id: string) => void;
}

const DeliverInstructions: React.FC<InstructionItemProps> = ({
  id,
  name,
  iconName,
  isSelected,
  toggleInstruction,
}) => {
  return (
    <Pressable
      onPress={() => toggleInstruction(id)}
      style={[styles.instruction, isSelected && styles.instructionSelected]}
    >
      <FontAwesome5 name={iconName} size={22} color="white" />
      <Text style={styles.instructionText}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  instruction: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  instructionSelected: {
    backgroundColor: '#fd5c63',
  },
  instructionText: {
    marginTop: 5,
    fontSize: 12,
    color: 'white',
  },
});

export default DeliverInstructions;
