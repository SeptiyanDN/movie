import React from 'react';
import { View, Pressable } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { Text } from '../../../components'; // Pastikan komponen Text dari direktori yang sesuai
import { defaultColors } from '../../../themes';
import styles from './styles';

interface InformasiItem {
    judul: string;
    konten: string;
}

const CardInformasi: React.FC<{
    data: InformasiItem;
    onToggle: () => void; // Tambahkan properti onToggle
    expanded: boolean;
}> = ({ data, expanded, onToggle }) => {

    const toggleShowContent = () => {
        onToggle(); // Panggil fungsi onToggle yang diberikan dari komponen induk
    };

    return (
        <View>
            <Pressable style={styles.box} onPress={toggleShowContent}>
                <View style={styles.textBox}>
                    <Text
                        type="regular"
                        size={18}
                        color={defaultColors.text}>
                        {data.judul}
                    </Text>
                </View>
                <View style={styles.centerBox}>
                    <IconAntDesign
                        name={expanded ? 'upcircle' : 'downcircle'}
                        size={24}
                        color={defaultColors.primary}
                    />
                </View>
            </Pressable>
            {expanded && (
                <View style={styles.expandedCard}>
                    <Text
                        type="regular"
                        size={16}
                        color={defaultColors.text}>
                        {data.konten}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default CardInformasi;
