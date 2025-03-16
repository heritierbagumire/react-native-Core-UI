import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { CartItem as CartItemType } from '../types/api';
import { useCartStore } from '@/store/UseCartStore'; 
import { Minus, Plus, Trash2 } from 'lucide-react-native';

interface CartItemProps {
    item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeItem } = useCartStore();

    return (
        <View style={styles.container}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <View style={styles.quantityContainer}>
                    <Pressable
                        onPress={() => {
                            if (item.quantity > 1) {
                                updateQuantity(item.id, item.quantity - 1);
                            } else {
                                removeItem(item.id);
                            }
                        }}
                        style={styles.quantityButton}>
                        <Minus size={16} color="#666" />
                    </Pressable>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <Pressable
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        style={styles.quantityButton}>
                        <Plus size={16} color="#666" />
                    </Pressable>
                    <Pressable
                        onPress={() => removeItem(item.id)}
                        style={styles.removeButton}>
                        <Trash2 size={16} color="#FF3B30" />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: 'white',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    details: {
        flex: 1,
        marginLeft: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '600',
        marginBottom: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        padding: 8,
        backgroundColor: '#F2F2F7',
        borderRadius: 8,
    },
    quantity: {
        marginHorizontal: 16,
        fontSize: 16,
        fontWeight: '600',
    },
    removeButton: {
        marginLeft: 'auto',
        padding: 8,
        backgroundColor: '#FFF2F2',
        borderRadius: 8,
    },
});