import { useConnect } from 'wagmi'

export const ConnectWallet = () => {
  const [{ data, error }, connect] = useConnect()

  return (
    <>
      {data.connectors.map((connector) => (
        <button
          className="btn btn-border"
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect(connector)}
        >
          連接錢包
          {!connector.ready && ' (unsupported)'}
        </button>
      ))}
      <div>
        {error && <div>{error?.message ?? 'Failed to connect'}</div>}
      </div>
    </>
  )
}