import React, { useMemo, useState } from 'react';
import IconFeather from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, Pressable, StatusBar, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet } from 'react-native';
import { defaultColors } from '../../themes';
import { useOTAVersion } from '../../utils/hooks';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { Text } from '../../components';
import CardInformasi from './PertanyaanUmum';
interface PertanyaanJawaban {
  judul: string;
  konten: string;
}

export default function Information() {
  const navigation: any = useNavigation();
  const { readableVersion } = useOTAVersion();
  const statusBarHeight = getStatusBarHeight();

  const [showPertanyaanUmum, setShowPertanyaanUmum] = useState(false);
  const [showSyaratDanKetentuan, setshowSyaratDanKetentuan] = useState(false);
  const [showPrivasiDanKebijakan, setshowPrivasiDanKebijakan] = useState(false);
  const pertanyaanJawabanList: PertanyaanJawaban[] = [
    {
      judul: 'Min ini aplikasi resmi atau ga?',
      konten:
        'Ini bukan aplikasi Resmi seperti Viu yang memiliki Hak Siar resmi, sumber film kami berdasarkan komunitas Subs di Indonesia dan situs-situs web penyedia download gratis Drama lainnya.',
    },
    {
      judul: 'Min kok Streamingnya lambat ya?',
      konten:
        'Streaming lambat ada beberapa faktor dan yang paling sering terjadi karena sedang banyak yang akses sehingga Server kami membagi-bagi koneksi ke pengguna.',
    },
    {
      judul: 'Min kok Downloadnya sering Error ya?',
      konten:
        'Sejak update Android SDK 29 yang diwajibkan oleh Google, fitur download di aplikasi telah dibatasi oleh mereka sehingga tidak optimal, So kalau download sering gagal kami sarankan Streaming aja ya :-)',
    },
    {
      judul: 'Min mau Streaming lewat GDrive kok error ya?',
      konten:
        'Film yang baru saja di-upload butuh waktu untuk melakukan transcoding atau membagi-bagi kualitas video ataupun di-convert ulang oleh Google seperti YouTube sehingga tidak akan bisa langsung di-play. Biasanya butuh waktu 15 sampai 30 menit tergantung durasi dan ukuran file.',
    },
    {
      judul: 'Min mau Download lewat GDrive kok error juga ya?',
      konten:
        'GDrive hanya bisa Download jika penggunaan bandwith belum mencapai 1TB dalam sehari, namun karena banyaknya pengguna Drakor ID yang download melalui GDrive akan selalu terkena limit.',
    },
    {
      judul: 'Min mau cari Drama ini kok ga ada ya?',
      konten:
        'Perlu diingat kata kunci tidak perlu lengkap, misal mau cari Itaewon Class, ketikan saja "Itaewon" atau "Ball" maka Drama atau Movie yang terdapat kata tersebut akan muncul.',
    },
    {
      judul: 'Min kok update Ongoing nya ga sesuai Jadwal sih?',
      konten:
        'Perlu diketahui Admin disini hanya 1 orang yang sekaligus merangkap sebagai Seller dan Uploader, so harap maklum jika update Drama ongoing tidak sesuai jadwal :-)',
    },
    {
      judul: 'Selamat Menonton dan Jangan Lupa Beri Rating bintang 5 ya...',
      konten: 'Terima Kasih!',
    },
    // ... tambahkan pertanyaan dan jawaban lainnya sesuai kebutuhan
  ];
  const syaratDanKetentuanList: PertanyaanJawaban[] = [
    {
      judul: 'Penggunaan Aplikasi',
      konten:
        'Dengan menggunakan aplikasi ini, Anda setuju untuk mematuhi syarat & ketentuan ini.',
    },
    {
      judul: 'Konten',
      konten:
        'Ini bukan aplikasi Resmi seperti Viu dan lainya yang memiliki Hak Siar resmi.',
    },
    {
      judul: 'Sumber Konten Film',
      konten:
        'Sumber film kami berdasarkan komunitas Subs di Indonesia dan situs-situs web penyedia download gratis Drama lainnya.',
    },
    {
      judul: 'Akun Pengguna',
      konten:
        'Anda bertanggung jawab untuk menjaga keamanan dan kerahasiaan akun Anda.',
    },
  ];
  const privasiDanKebijakanList: PertanyaanJawaban[] = [
    {
      judul: 'Pengumpulan Data',
      konten:
        'Kami mengumpulkan data pribadi Anda seperti nama, alamat email, dan informasi akun lainnya untuk keperluan operasional aplikasi.',
    },
    {
      judul: 'Penggunaan Data',
      konten:
        'Data yang kami kumpulkan digunakan untuk menyediakan layanan dan meningkatkan pengalaman pengguna.',
    },
    {
      judul: 'Penyimpanan Data',
      konten:
        'Data Anda akan disimpan dengan aman dan tidak akan dibagikan kepada pihak ketiga tanpa izin Anda.',
    },
  ];

  const renderHeader = useMemo(() => {
    return (
      <View
        style={{
          width: wp(100),
        }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={'transparent'}
          translucent={true}
        />
        <View
          style={[
            {
              height: 56,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
            { marginTop: statusBarHeight },
          ]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{
                height: 56,
                width: 56,
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              <IconFeather
                name={'x'}
                size={24}
                color={defaultColors.text}
                style={{
                  marginLeft: 16,
                  color: defaultColors.text,
                }}
              />
            </Pressable>
            <Text
              type="medium"
              size={23}
              style={{
                marginLeft: 16,
                color: defaultColors.text,
              }}>
              Pusat Informasi
            </Text>
          </View>
        </View>
      </View>
    );
  }, [navigation, statusBarHeight]);
  const renderVersion = useMemo(() => {
    return (
      <View
        style={{
          width: wp(100),
          marginTop: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text type="regular" size={18} color={defaultColors.grayText}>
          Versi {readableVersion}
        </Text>
      </View>
    );
  }, [readableVersion]);
  const renderLine = useMemo(() => {
    return (
      <View
        style={{
          height: 1.2,
          width: wp(100) - 64,
          backgroundColor: '#E0E0E0',
        }}
      />
    );
  }, []);
  const renderChevronRight = useMemo(() => {
    return (
      <View style={styles.centerBox}>
        <IconEntypo
          name="chevron-thin-right"
          size={24}
          color={defaultColors.primary}
        />
      </View>
    );
  }, []);

  const togglePertanyaanUmum = () => {
    setShowPertanyaanUmum(!showPertanyaanUmum);
    setshowSyaratDanKetentuan(false); // Tutup toggleSyaratDanKetentuan
    setshowPrivasiDanKebijakan(false); // Tutup togglePrivasiDanKebijakan
  };

  const toggleSyaratDanKetentuan = () => {
    setshowSyaratDanKetentuan(!showSyaratDanKetentuan);
    setShowPertanyaanUmum(false); // Tutup togglePertanyaanUmum
    setshowPrivasiDanKebijakan(false); // Tutup togglePrivasiDanKebijakan
  };

  const togglePrivasiDanKebijakan = () => {
    setshowPrivasiDanKebijakan(!showPrivasiDanKebijakan);
    setShowPertanyaanUmum(false); // Tutup togglePertanyaanUmum
    setshowSyaratDanKetentuan(false); // Tutup toggleSyaratDanKetentuan
  };

  const [expandedIndex, setExpandedIndex] = useState(-1); // -1 berarti tidak ada yang diperluas

  const renderInformation = useMemo(() => {
    return (
      <>
        <Text
          type="medium"
          size={20}
          color={defaultColors.text}
          style={{ marginLeft: 16, marginTop: 24 }}>
          Informasi Umum
        </Text>
        <View style={styles.card}>
          <Pressable style={styles.box} onPress={togglePertanyaanUmum}>
            <View style={styles.centerBox}>
              <IconAntDesign
                name="questioncircleo"
                size={24}
                color={defaultColors.primary}
              />
            </View>
            <View style={styles.textBox}>
              <Text
                numberOfLines={1}
                type={'regular'}
                size={18}
                color={defaultColors.text}>
                Pertanyaan Umum
              </Text>
            </View>
            {renderChevronRight}
          </Pressable>
          {showPertanyaanUmum && (
            <View style={styles.expandedCard}>
              {pertanyaanJawabanList.map((item, index) => (
                <CardInformasi
                  key={index}
                  data={item} // Memperbarui properti data dengan objek item
                  expanded={expandedIndex === index}
                  onToggle={() => {
                    if (expandedIndex === index) {
                      setExpandedIndex(-1); // Tutup jika sudah terbuka
                    } else {
                      setExpandedIndex(index); // Buka jika belum terbuka
                    }
                  }}
                />
              ))}
            </View>
          )}
          {renderLine}
          <Pressable style={styles.box} onPress={toggleSyaratDanKetentuan}>
            <View style={styles.centerBox}>
              <IconIonicons
                name="document-text-outline"
                size={24}
                color={defaultColors.primary}
              />
            </View>
            <View style={styles.textBox}>
              <Text
                numberOfLines={1}
                type={'regular'}
                size={18}
                color={defaultColors.text}>
                Syarat & Ketentuan
              </Text>
            </View>
            {renderChevronRight}
          </Pressable>
          {showSyaratDanKetentuan && (
            <View style={styles.expandedCard}>
              {syaratDanKetentuanList.map((item, index) => (
                <CardInformasi
                  key={index}
                  data={item} // Memperbarui properti data dengan objek item
                  expanded={expandedIndex === index}
                  onToggle={() => {
                    if (expandedIndex === index) {
                      setExpandedIndex(-1); // Tutup jika sudah terbuka
                    } else {
                      setExpandedIndex(index); // Buka jika belum terbuka
                    }
                  }}
                />
              ))}
            </View>
          )}
          {renderLine}
          <Pressable style={styles.box} onPress={togglePrivasiDanKebijakan}>
            <View style={styles.centerBox}>
              <IconIonicons
                name="alert-circle-outline"
                size={24}
                color={defaultColors.primary}
              />
            </View>
            <View style={styles.textBox}>
              <Text
                numberOfLines={1}
                type={'regular'}
                size={18}
                color={defaultColors.text}>
                Privasi & Kebijakan
              </Text>
            </View>
            {renderChevronRight}
          </Pressable>
          {showPrivasiDanKebijakan && (
            <View style={styles.expandedCard}>
              {privasiDanKebijakanList.map((item, index) => (
                <CardInformasi
                  key={index}
                  data={item} // Memperbarui properti data dengan objek item
                  expanded={expandedIndex === index}
                  onToggle={() => {
                    if (expandedIndex === index) {
                      setExpandedIndex(-1); // Tutup jika sudah terbuka
                    } else {
                      setExpandedIndex(index); // Buka jika belum terbuka
                    }
                  }}
                />
              ))}
            </View>
          )}
        </View>
      </>
    );
  }, [
    expandedIndex,
    pertanyaanJawabanList,
    privasiDanKebijakanList,
    renderChevronRight,
    renderLine,
    showPertanyaanUmum,
    showPrivasiDanKebijakan,
    showSyaratDanKetentuan,
    syaratDanKetentuanList,
    togglePertanyaanUmum,
    togglePrivasiDanKebijakan,
    toggleSyaratDanKetentuan,
  ]);

  // const renderPreferences = useMemo(() => {
  //   return (
  //     <>
  //       <Text
  //         type="medium"
  //         size={20}
  //         color={defaultColors.text}
  //         style={{ marginLeft: 16, marginTop: 24 }}>
  //         Preferensi
  //       </Text>
  //       <View style={styles.card}>
  //         <Pressable
  //           style={styles.box}
  //           onPress={() => navigation.navigate('ChangePassword')}>
  //           <View style={styles.centerBox}>
  //             <IconFeather
  //               name="unlock"
  //               size={24}
  //               color={defaultColors.primary}
  //             />
  //           </View>
  //           <View style={styles.textBox}>
  //             <Text
  //               numberOfLines={1}
  //               type={'regular'}
  //               size={18}
  //               color={defaultColors.text}>
  //               Ganti Password
  //             </Text>
  //           </View>
  //           {renderChevronRight}
  //         </Pressable>
  //         {renderLine}
  //         <Pressable onPress={() => dispatch(clearTokens())} style={styles.box}>
  //           <View style={styles.centerBox}>
  //             <IconFeather
  //               name="log-out"
  //               size={24}
  //               color={defaultColors.primary}
  //             />
  //           </View>
  //           <View style={styles.textBox}>
  //             <Text
  //               type={'semibold'}
  //               numberOfLines={1}
  //               size={18}
  //               color={defaultColors.primary}>
  //               Keluar
  //             </Text>
  //           </View>
  //         </Pressable>
  //       </View>
  //     </>
  //   );
  // }, [dispatch, navigation, renderChevronRight, renderLine]);

  return (
    <ScrollView style={[styles.container]}>
      {renderHeader}
      {renderInformation}
      {/* {renderPreferences} */}
      {renderVersion}
      {/* {renderBtnToken} */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  title: {
    color: defaultColors.text,
  },
  button: {
    backgroundColor: defaultColors.primary,
    width: wp(50) - 32 - 14,
    height: 50,
    marginTop: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerFAQ: {
    backgroundColor: defaultColors.grayText,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  answer: {
    fontSize: 16,
    marginBottom: 4,
  },
  textBox: {
    height: 55,
    width: wp(100) - 110 - 32,
    justifyContent: 'center',
  },
  expandedCard: {
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  contentContainer: {
    marginBottom: 10,
  },
  centerBox: {
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: wp(100) - 32,
    marginHorizontal: 16,
    backgroundColor: defaultColors.white,
    borderRadius: 10,
    elevation: 3,
    marginTop: 16,
    alignItems: 'center',
    overflow: 'hidden',
  },
  box: {
    height: 55,
    width: wp(100) - 32,
    backgroundColor: defaultColors.white,
    flexDirection: 'row',
  },
});
