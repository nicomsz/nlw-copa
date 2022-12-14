import { Heading, Text, VStack } from "native-base";
import { Header } from "../components/Header";
import Logo from '../assets/logo.svg'
import { Input } from "../components/Input";
import { Button } from "../components/button";
export function New () {
    return ( 
        <VStack>
            <Header title="Buscar por código" />
            <VStack>
                 <Logo />
                 <Heading fontFamily='heading' color='white' fontSize='xl' my={8} textAlign='center'>
                    Encontre seu bolão através de {'\n'} 
                     seu bolão único
                 </Heading>
                 <Input mb={2} placeholder='Qual o nome do seu bolão? '/>
                 <Button title="Criar meu bolão" />
                 <Text color='gray.200' fontSize='sm' textAlign='center' px={10} mt={4}>
                 Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
                 </Text>

                 
            </VStack>
        </VStack>
    )
}