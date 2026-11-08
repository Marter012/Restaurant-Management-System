import {
  Container,
  Content,
  Brand,
  SpinnerContainer,
  Spinner,
  Title,
  Subtitle,
  StatusContainer,
  StatusItem,
  StatusIcon,
  RetryButton,
} from "./LoadingScreenStyles.ts";

interface LoadingItem {
  label: string;
  completed: boolean;
}

interface LoadingScreenProps {
  items: LoadingItem[];
  error?: boolean;
  onRetry?: () => void;
}

const LoadingScreen = ({
  items,
  error = false,
  onRetry,
}: LoadingScreenProps) => {
  return (
    <Container>
      <Content>

        <Brand>
          <h1>BOUTIQUE SABORES</h1>
        </Brand>

        {!error && (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        )}

        <Title>
          {error
            ? "No se pudo iniciar el sistema"
            : "Preparando sistema..."}
        </Title>

        <Subtitle>
          {error
            ? "Revisá la conexión con el servidor"
            : "Esperá un momento"}
        </Subtitle>

        <StatusContainer>
          {items.map((item, index) => (
            <StatusItem
              key={index}
              $completed={item.completed}
            >
              <StatusIcon $completed={item.completed}>
                {item.completed ? "✓" : "○"}
              </StatusIcon>

              <span>{item.label}</span>
            </StatusItem>
          ))}
        </StatusContainer>

        {error && onRetry && (
          <RetryButton onClick={onRetry}>
            Reintentar
          </RetryButton>
        )}

      </Content>
    </Container>
  );
};

export default LoadingScreen;