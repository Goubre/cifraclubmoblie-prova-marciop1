import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  StatusBar,
  TextInput,
  Switch,
} from 'react-native';

import BottomNav from '../components/BottomNav';
import { colors } from '../theme/colors';

export default function MoreScreen({ onNavigate }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const [notifications, setNotifications] =
    useState(true);

  const [autoScroll, setAutoScroll] =
    useState(false);

  const [tunerNote, setTunerNote] =
    useState('E');

  const tunerNotes = [
    'E',
    'A',
    'D',
    'G',
    'B',
    'E agudo',
  ];

  const options = [
    {
      icon: '●',
      title: 'Entrar na sua conta',
    },
    {
      icon: '⚙',
      title: 'Configurações',
    },
    {
      icon: '♪',
      title: 'Afinador',
    },
    {
      icon: '↓',
      title: 'Conteúdo offline',
    },
    {
      icon: '?',
      title: 'Ajuda e suporte',
    },
    {
      icon: 'ⓘ',
      title: 'Sobre o Cifra Club',
    },
  ];

  function handleLogin() {
    if (!email.trim() || !password.trim()) {
      setLoginMessage(
        'Preencha o e-mail e a senha.'
      );
      return;
    }

    setLoginMessage(
      'Login demonstrativo realizado com sucesso!'
    );
  }

  function closeOption() {
    setSelectedOption(null);
    setLoginMessage('');
  }

  function renderSelectedOption() {
    if (selectedOption === 'Entrar na sua conta') {
      return (
        <View style={styles.panel}>
          <PanelHeader
            title="Entrar na sua conta"
            onClose={closeOption}
          />

          <Text style={styles.panelDescription}>
            Entre para sincronizar suas músicas,
            favoritos e listas.
          </Text>

          <Text style={styles.inputLabel}>
            E-mail
          </Text>

          <TextInput
            style={styles.input}
            placeholder="seuemail@exemplo.com"
            placeholderTextColor={colors.muted}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Text style={styles.inputLabel}>
            Senha
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor={colors.muted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Pressable
            style={styles.primaryButton}
            onPress={handleLogin}
          >
            <Text style={styles.primaryButtonText}>
              Entrar
            </Text>
          </Pressable>

          {loginMessage !== '' && (
            <View style={styles.messageCard}>
              <Text style={styles.messageText}>
                {loginMessage}
              </Text>
            </View>
          )}
        </View>
      );
    }

    if (selectedOption === 'Configurações') {
      return (
        <View style={styles.panel}>
          <PanelHeader
            title="Configurações"
            onClose={closeOption}
          />

          <Text style={styles.panelDescription}>
            Personalize algumas opções do
            aplicativo.
          </Text>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                Notificações
              </Text>

              <Text style={styles.settingDescription}>
                Receber novidades e recomendações
              </Text>
            </View>

            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{
                false: colors.surfaceLight,
                true: colors.primary,
              }}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                Rolagem automática
              </Text>

              <Text style={styles.settingDescription}>
                Ativar por padrão nas cifras
              </Text>
            </View>

            <Switch
              value={autoScroll}
              onValueChange={setAutoScroll}
              trackColor={{
                false: colors.surfaceLight,
                true: colors.primary,
              }}
            />
          </View>

          <View style={styles.statusCard}>
            <Text style={styles.statusTitle}>
              Tema
            </Text>

            <Text style={styles.statusValue}>
              Escuro
            </Text>
          </View>
        </View>
      );
    }

    if (selectedOption === 'Afinador') {
      return (
        <View style={styles.panel}>
          <PanelHeader
            title="Afinador"
            onClose={closeOption}
          />

          <Text style={styles.panelDescription}>
            Afinador demonstrativo para as cordas
            do violão e da guitarra.
          </Text>

          <View style={styles.tuner}>
            <Text style={styles.tunerLabel}>
              NOTA SELECIONADA
            </Text>

            <Text style={styles.tunerNote}>
              {tunerNote}
            </Text>

            <View style={styles.tunerLine}>
              <View style={styles.tunerMarker} />
            </View>

            <Text style={styles.tunerStatus}>
              Afinado
            </Text>
          </View>

          <Text style={styles.smallSectionTitle}>
            Selecione uma corda
          </Text>

          <View style={styles.noteContainer}>
            {tunerNotes.map((note, index) => (
              <Pressable
                key={`${note}-${index}`}
                style={[
                  styles.noteButton,
                  tunerNote === note &&
                    styles.noteButtonActive,
                ]}
                onPress={() =>
                  setTunerNote(note)
                }
              >
                <Text
                  style={[
                    styles.noteText,
                    tunerNote === note &&
                      styles.noteTextActive,
                  ]}
                >
                  {note}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.demoText}>
            Modo demonstrativo — não utiliza o
            microfone do aparelho.
          </Text>
        </View>
      );
    }

    if (selectedOption === 'Conteúdo offline') {
      return (
        <View style={styles.panel}>
          <PanelHeader
            title="Conteúdo offline"
            onClose={closeOption}
          />

          <View style={styles.emptyState}>
            <View style={styles.bigIcon}>
              <Text style={styles.bigIconText}>
                ↓
              </Text>
            </View>

            <Text style={styles.emptyTitle}>
              Nenhuma cifra baixada
            </Text>

            <Text style={styles.emptyText}>
              As músicas salvas para acesso
              offline aparecerão aqui.
            </Text>

            <Pressable
              style={styles.secondaryButton}
              onPress={() =>
                onNavigate?.('Busca')
              }
            >
              <Text
                style={styles.secondaryButtonText}
              >
                Buscar músicas
              </Text>
            </Pressable>
          </View>
        </View>
      );
    }

    if (selectedOption === 'Ajuda e suporte') {
      return (
        <View style={styles.panel}>
          <PanelHeader
            title="Ajuda e suporte"
            onClose={closeOption}
          />

          <Text style={styles.panelDescription}>
            Dúvidas frequentes sobre o aplicativo.
          </Text>

          <HelpItem
            question="Como encontrar uma cifra?"
            answer="Use a aba Busca e pesquise pelo nome da música ou do artista."
          />

          <HelpItem
            question="Como alterar o tom?"
            answer="Abra uma cifra e utilize os botões de menos e mais na opção Tom."
          />

          <HelpItem
            question="Como usar a rolagem automática?"
            answer="Na tela da cifra, toque em Rolagem para iniciar ou parar."
          />

          <HelpItem
            question="Posso criar minhas próprias listas?"
            answer="Sim. Abra a aba Listas e toque em Nova lista."
          />
        </View>
      );
    }

    if (selectedOption === 'Sobre o Cifra Club') {
      return (
        <View style={styles.panel}>
          <PanelHeader
            title="Sobre o aplicativo"
            onClose={closeOption}
          />

          <View style={styles.aboutInside}>
            <View style={styles.aboutIcon}>
              <Text style={styles.aboutIconText}>
                ♪
              </Text>
            </View>

            <Text style={styles.aboutInsideLogo}>
              cifraclub
            </Text>

            <Text style={styles.aboutInsideText}>
              Aplicativo demonstrativo inspirado
              no Cifra Club, desenvolvido para
              atividade acadêmica utilizando
              React Native e Expo.
            </Text>

            <View style={styles.aboutDetails}>
              <Text style={styles.detailLabel}>
                Plataforma
              </Text>
              <Text style={styles.detailValue}>
                React Native + Expo
              </Text>
            </View>

            <View style={styles.aboutDetails}>
              <Text style={styles.detailLabel}>
                Versão
              </Text>
              <Text style={styles.detailValue}>
                1.0 acadêmica
              </Text>
            </View>
          </View>
        </View>
      );
    }

    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            Mais
          </Text>

          <Text style={styles.subtitle}>
            Conta, ferramentas e configurações
          </Text>
        </View>

        {!selectedOption ? (
          <>
            <Pressable
              style={({ pressed }) => [
                styles.profileCard,
                pressed && styles.pressed,
              ]}
              onPress={() =>
                setSelectedOption(
                  'Entrar na sua conta'
                )
              }
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  ♪
                </Text>
              </View>

              <View style={styles.profileInfo}>
                <Text style={styles.profileTitle}>
                  Cifra Club
                </Text>

                <Text
                  style={styles.profileSubtitle}
                >
                  Entre para salvar suas músicas e
                  listas
                </Text>
              </View>

              <Text style={styles.profileArrow}>
                ›
              </Text>
            </Pressable>

            <Text style={styles.sectionTitle}>
              Recursos
            </Text>

            <View
              style={styles.optionsContainer}
            >
              {options.map((item, index) => (
                <Pressable
                  key={item.title}
                  style={({ pressed }) => [
                    styles.option,
                    index !==
                      options.length - 1 &&
                      styles.optionBorder,
                    pressed && styles.pressed,
                  ]}
                  onPress={() =>
                    setSelectedOption(item.title)
                  }
                >
                  <View
                    style={styles.optionIcon}
                  >
                    <Text
                      style={styles.iconText}
                    >
                      {item.icon}
                    </Text>
                  </View>

                  <Text
                    style={styles.optionText}
                  >
                    {item.title}
                  </Text>

                  <Text style={styles.arrow}>
                    ›
                  </Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.aboutCard}>
              <Text style={styles.aboutLogo}>
                cifraclub
              </Text>

              <Text style={styles.aboutText}>
                Projeto demonstrativo desenvolvido
                em React Native com Expo.
              </Text>
            </View>

            <Text style={styles.version}>
              Cifra Club • Versão demonstrativa
            </Text>
          </>
        ) : (
          renderSelectedOption()
        )}
      </ScrollView>

      <BottomNav
        active="Mais"
        onNavigate={onNavigate}
      />
    </SafeAreaView>
  );
}

function PanelHeader({ title, onClose }) {
  return (
    <View style={styles.panelHeader}>
      <Pressable
        style={styles.backButton}
        onPress={onClose}
      >
        <Text style={styles.backButtonText}>
          ‹
        </Text>
      </Pressable>

      <Text style={styles.panelTitle}>
        {title}
      </Text>

      <View style={styles.headerSpace} />
    </View>
  );
}

function HelpItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <Pressable
      style={styles.helpItem}
      onPress={() => setOpen(!open)}
    >
      <View style={styles.helpHeader}>
        <Text style={styles.helpQuestion}>
          {question}
        </Text>

        <Text style={styles.helpArrow}>
          {open ? '−' : '+'}
        </Text>
      </View>

      {open && (
        <Text style={styles.helpAnswer}>
          {answer}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: StatusBar.currentHeight || 0,
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 25,
  },

  header: {
    marginBottom: 23,
  },

  title: {
    color: colors.text,
    fontSize: 29,
    fontWeight: '800',
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 5,
  },

  pressed: {
    opacity: 0.6,
  },

  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },

  profileInfo: {
    flex: 1,
    marginLeft: 14,
  },

  profileTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },

  profileSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },

  profileArrow: {
    color: colors.muted,
    fontSize: 27,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 29,
    marginBottom: 14,
  },

  optionsContainer: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },

  option: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  optionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconText: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: '600',
  },

  optionText: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    marginLeft: 13,
    fontWeight: '500',
  },

  arrow: {
    color: colors.muted,
    fontSize: 26,
  },

  aboutCard: {
    alignItems: 'center',
    marginTop: 30,
    padding: 20,
  },

  aboutLogo: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: -0.7,
  },

  aboutText: {
    color: colors.muted,
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 17,
    marginTop: 7,
    maxWidth: 270,
  },

  version: {
    color: colors.muted,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 5,
  },

  panel: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 17,
  },

  panelHeader: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  backButton: {
    width: 38,
    height: 38,
    justifyContent: 'center',
  },

  backButtonText: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 34,
  },

  panelTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
    flex: 1,
  },

  headerSpace: {
    width: 38,
  },

  panelDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 20,
  },

  inputLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 7,
  },

  input: {
    height: 48,
    backgroundColor: colors.backgroundSoft,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: colors.borderLight,
    color: colors.text,
    paddingHorizontal: 13,
    fontSize: 14,
    marginBottom: 15,
  },

  primaryButton: {
    height: 47,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
  },

  messageCard: {
    backgroundColor: colors.primarySoft,
    borderRadius: 10,
    padding: 12,
    marginTop: 13,
  },

  messageText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },

  settingRow: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  settingInfo: {
    flex: 1,
    paddingRight: 12,
  },

  settingTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },

  settingDescription: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 4,
  },

  statusCard: {
    backgroundColor: colors.backgroundSoft,
    borderRadius: 12,
    padding: 14,
    marginTop: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statusTitle: {
    color: colors.textSecondary,
    fontSize: 13,
  },

  statusValue: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },

  tuner: {
    backgroundColor: colors.backgroundSoft,
    borderRadius: 17,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  tunerLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },

  tunerNote: {
    color: colors.text,
    fontSize: 58,
    fontWeight: '800',
    marginVertical: 12,
  },

  tunerLine: {
    width: '100%',
    height: 3,
    backgroundColor: colors.borderLight,
    borderRadius: 2,
    alignItems: 'center',
  },

  tunerMarker: {
    width: 5,
    height: 18,
    backgroundColor: colors.primary,
    borderRadius: 3,
    marginTop: -7,
  },

  tunerStatus: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 15,
  },

  smallSectionTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 22,
    marginBottom: 12,
  },

  noteContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  noteButton: {
    minWidth: 48,
    height: 42,
    borderRadius: 10,
    backgroundColor: colors.backgroundSoft,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 8,
    paddingHorizontal: 10,
  },

  noteButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  noteText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },

  noteTextActive: {
    color: colors.white,
  },

  demoText: {
    color: colors.muted,
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
    marginTop: 10,
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 25,
  },

  bigIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bigIconText: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: '700',
  },

  emptyTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
    marginTop: 17,
  },

  emptyText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    maxWidth: 260,
    marginTop: 7,
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 11,
    paddingHorizontal: 18,
    paddingVertical: 11,
    marginTop: 19,
  },

  secondaryButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },

  helpItem: {
    backgroundColor: colors.backgroundSoft,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 9,
  },

  helpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  helpQuestion: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    paddingRight: 10,
  },

  helpArrow: {
    color: colors.primary,
    fontSize: 20,
  },

  helpAnswer: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
  },

  aboutInside: {
    alignItems: 'center',
  },

  aboutIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  aboutIconText: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: '700',
  },

  aboutInsideLogo: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '800',
    marginTop: 15,
  },

  aboutInsideText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 9,
    marginBottom: 20,
    maxWidth: 280,
  },

  aboutDetails: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 13,
  },

  detailLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },

  detailValue: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
});