import React, {FC, useCallback, useState} from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {EnterFormData} from '@screens/Enter';
import {UseFormSetValue} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';

const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const SModal = styled(Modal)`
  margin: 0;
  justify-content: flex-end;
`;
const Container = styled.View`
  background: #fff;
  flex-direction: row;
  align-items: center;
`;

interface IBirthModalProp {
  toggleBirthModal: () => void;
  isVisible: boolean;
  setValue: UseFormSetValue<EnterFormData>;
}

const BirthModal: FC<IBirthModalProp> = ({
  toggleBirthModal,
  isVisible,
  setValue,
}) => {
  const [year, setYear] = useState(1960);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const getYears = useCallback(() => {
    const years = [];
    for (let i = 0; i < 50; i++) {
      years.push(`${1960 + i}`);
    }
    console.log(years);
    return years;
  }, []);
  const getDays = useCallback(() => {
    const days = [];
    for (let i = 0; i < 31; i++) {
      days.push(`${i + 1}`);
    }
    console.log(days);
    return days;
  }, []);
  const onSubmit = () => {
    setValue('birth', `${year}-${month}-${day}`);
    toggleBirthModal();
  };
  return (
    <SModal
      isVisible={isVisible}
      onBackButtonPress={onSubmit}
      onBackdropPress={onSubmit}>
      <Container>
        <Picker
          style={{width: '40%'}}
          selectedValue={year}
          onValueChange={year => setYear(year)}>
          {getYears().map(year => (
            <Picker.Item key={year} label={`${year}년`} value={year} />
          ))}
        </Picker>
        <Picker
          style={{width: '30%'}}
          selectedValue={month}
          onValueChange={month => setMonth(month)}>
          {months.map(month => (
            <Picker.Item key={month} label={`${month}월`} value={month} />
          ))}
        </Picker>
        <Picker
          style={{width: '30%'}}
          selectedValue={day}
          onValueChange={day => setDay(day)}>
          {getDays().map(day => (
            <Picker.Item key={day} label={`${day}일`} value={day} />
          ))}
        </Picker>
      </Container>
    </SModal>
  );
};

export default BirthModal;
