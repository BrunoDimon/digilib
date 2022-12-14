import React, { useState, useContext } from "react";
import { FlatList, View, TouchableOpacity, Image } from "react-native";
import { Actionsheet, useDisclose, Box, Text, Icon, ScrollView, IconButton, Center } from "native-base";
import { MaterialIcons, } from "@expo/vector-icons";
import { AuthContext } from "../navigation/AuthContext"


const Item = ({ title, author, onPress }) => (

    <TouchableOpacity style={{ backgroundColor: "#d2d2d2", paddingHorizontal: 10, paddingVertical: 10, marginVertical: 1, marginHorizontal: 5, borderRadius: 5, alignSelf: "center", alignItems: "center", width: "95%", flexDirection: 'row', height: 60 }} onPress={onPress}>
        <Image source={require('../assets/user-profile.png')} style={{ height: 35, width: 35, borderRadius: 15 }} />
        <View style={{ flex: 1, flexDirection: "column", alignItems: "flex-start" }}>
            <Text style={{ fontSize: 18, paddingLeft: 10, textAlign: "center" }}>{title}</Text>
            <Text style={{ fontSize: 14, paddingLeft: 10, textAlign: "center" }}>{author}</Text>
        </View>
    </TouchableOpacity >

);

export function ListBooks(props) {
    const { userToken } = useContext(AuthContext)
    const { isOpen, onOpen, onClose } = useDisclose();
    const [dataBookModal, setDataBookModal] = useState([]);

    function clickItem(item) {
        onOpen();
        setDataBookModal(item);
    }

    const renderItem = ({ item }) => <Item title={item.title} author={item.author} onPress={() => clickItem(item)} />;

    const ButtonsManage = () => (
        <Box>
            <IconButton icon={<Icon as={MaterialIcons} size="6" name="delete" />} _icon={{ color: "white", size: "md" }} bg={"red.500"} w={10} h={10} mb={1} />
            <IconButton icon={<Icon as={MaterialIcons} size="6" name="edit" />} _icon={{ color: "white", size: "md" }} bg={"blue.400"} w={10} h={10} />
        </Box>
    )

    const FlatListEmpty = () => (
        <Center >
            <Text>Sem dados encontados</Text>
        </Center>
    );
    const HeaderFlatList = () => (
        <Center flexDir={'row'} w={"95%"} alignSelf={'center'} >
            {/* Cabecalho da listagem */}
        </Center>
    );

    return (
        <View style={{ flex: 1, justifyContent: "space-around", backgroundColor: "transparent" }}>
            <FlatList data={props.data} renderItem={renderItem} keyExtractor={(item) => item.id} ListEmptyComponent={FlatListEmpty()} initialNumToRender={25} ListHeaderComponent={HeaderFlatList()} />
            <Actionsheet isOpen={isOpen} onClose={onClose} /* disableOverlay */>
                <Actionsheet.Content >
                    <Box w="100%" h={350} px={2}>
                        <Box style={{ flex: 1, flexDirection: 'row' }} maxH={"25%"} justifyContent={"space-around"} >
                            <Image source={require('../assets/user-profile.png')} style={{ height: 85, width: 85 }} />
                            <ScrollView showsVerticalScrollIndicator={false}/* w={"60%"} */>
                                <Text style={{ fontSize: 22 }}>{dataBookModal.title}</Text>
                                <Text style={{ fontSize: 18 }}>Autor: {dataBookModal.author}</Text>
                                <Text>Editora: {dataBookModal.publishingCompany}</Text>
                                <Text>Publica????o: {dataBookModal.productionYear}</Text>
                                <Text>Categoria: {dataBookModal.category}</Text>
                            </ScrollView>
                            {userToken !== null ? <ButtonsManage /> : null}
                        </Box>

                        <Box style={{ flexDirection: 'column', justifyContent: "flex-start", alignSelf: 'center', }} pt="2" maxH={"75%"}>
                            <Text style={{ fontSize: 18, textAlign: "center" }}>Resumo do Livro</Text>
                            <ScrollView>
                                {/*  <Text style={{ fontSize: 16, textAlign: "center" }}>{dataBookModal.description}</Text> */}
                                <Text style={{ fontSize: 16, textAlign: "left" }}>Com ilustra????es criativas e texto bem-humorado, Hawking desvenda desde os mist??rios da f??sica de part??culas at?? a din??mica das centenas de milh??es de gal??xias do universo. Para o iniciado, ?? uma bela representa????o de conceitos complexos; para o leigo, ?? um vislumbre dos segredos mais profundos da cria????o. Com ilustra????es criativas e texto bem-humorado, Hawking desvenda desde os mist??rios da f??sica de part??culas at?? a din??mica das centenas de milh??es de gal??xias do universo. Para o iniciado, ?? uma bela representa????o de conceitos complexos; para o leigo, ?? um vislumbre dos segredos mais profundos da cria????o. Com ilustra????es criativas e texto bem-humorado, Hawking desvenda desde os mist??rios da f??sica de part??culas at?? a din??mica das centenas de milh??es de gal??xias do universo. Para o iniciado, ?? uma bela representa????o de conceitos complexos; para o leigo, ?? um vislumbre dos segredos mais profundos da cria????o.</Text>
                            </ScrollView>
                        </Box>
                    </Box>
                </Actionsheet.Content>
            </Actionsheet>
        </View >
    );
}