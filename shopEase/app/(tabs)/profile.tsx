import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    Alert,
} from 'react-native';
import { User } from '../../types/api';

export default function ProfileScreen() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch('https://dummyjson.com/users/1');
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleImagePress = () => {
        Alert.alert(
            'Update Profile Picture',
            'Would you like to update your profile picture?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Choose Photo',
                    onPress: () => {
                        Alert.alert(
                            'Success',
                            'Profile picture updated successfully!',
                            [{ text: 'OK' }]
                        );
                    },
                },
            ]
        );
    };

    if (!user) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={handleImagePress}>
                <Image
                    source={{ uri: user.image }}
                    style={styles.profileImage}
                />
            </Pressable>
            <Text style={styles.name}>
                {user.firstName} {user.lastName}
            </Text>
            <Text style={styles.email}>{user.email}</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account Settings</Text>
                <Pressable style={styles.option}>
                    <Text style={styles.optionText}>Edit Profile</Text>
                </Pressable>
                <Pressable style={styles.option}>
                    <Text style={styles.optionText}>Change Password</Text>
                </Pressable>
                <Pressable style={styles.option}>
                    <Text style={styles.optionText}>Notifications</Text>
                </Pressable>
                <Pressable style={styles.option}>
                    <Text style={styles.optionText}>Privacy Settings</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
        alignItems: 'center',
        padding: 16,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    option: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F7',
    },
    optionText: {
        fontSize: 16,
        color: '#007AFF',
    },
});