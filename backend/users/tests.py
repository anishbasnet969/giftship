from django.test import TestCase
from django.contrib.auth import get_user_model

class UserAccountTests(TestCase):

    def test_new_user(self):
        User = get_user_model()
        user = User.objects.create_user('normal@user.com', 'password')
        self.assertEqual(user.email, 'normal@user.com')
        self.assertFalse(user.is_superuser)
        self.assertFalse(user.is_staff)
        self.assertTrue(user.is_active)

        try:
            self.assertIsNone(user.username)
        except AttributeError:
            pass

        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email='')
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password='password')

    def test_new_superuser(self):
        User = get_user_model()
        super_user = User.objects.create_superuser('super@user.com', 'password')
        self.assertEqual(super_user.email, 'super@user.com')
        self.assertTrue(super_user.is_superuser)
        self.assertTrue(super_user.is_staff)
        self.assertTrue(super_user.is_active)

        try:
            self.assertIsNone(super_user.username)
        except AttributeError:
            pass

        with self.assertRaises(ValueError):
            User.objects.create_superuser(email='testuser@super.com', password='password', is_superuser=False)