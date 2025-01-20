module.exports = [
  {
    "roles": ["active", "owner"],
    "operation": "transfer",
    "params": [
      "from",
      "to",
      "amount",
      "memo"
    ]
  },
  {
    "roles": ["active"],
    "operation": "transfer_to_qi",
    "params": [
      "from",
      "to",
      "amount"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "withdraw_qi",
    "params": [
      "account",
      "qi"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "price",
    "params": [
      "base",
      "quote"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "account_create",
    "params": [
      "fee",
      "creator",
      "new_account_name",
      "owner",
      "active",
      "posting",
      "memo_key",
      "json_metadata"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "account_update",
    "params": [
      "account",
      "owner",
      "active",
      "posting",
      "memo_key",
      "json_metadata"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "siming_update",
    "params": [
      "owner",
      "url",
      "block_signing_key",
      "props",
      "fee"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "account_siming_adore",
    "params": [
      "account",
      "siming",
      "approve"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "account_siming_proxy",
    "params": [
      "account",
      "proxy"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "custom",
    "params": [
      "required_auths",
      "id",
      "data"
    ]
  },
  {
    "roles": ["posting", "active", "owner"],
    "operation": "custom_json",
    "params": [
      "required_auths",
      "required_posting_auths",
      "id",
      "json"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "set_withdraw_qi_route",
    "params": [
      "from_account",
      "to_account",
      "percent",
      "auto_vest"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "request_account_recovery",
    "params": [
      "recovery_account",
      "account_to_recover",
      "new_owner_authority",
      "extensions"
    ]
  },
  {
    "roles": ["owner"],
    "operation": "recover_account",
    "params": [
      "account_to_recover",
      "new_owner_authority",
      "recent_owner_authority",
      "extensions"
    ]
  },
  {
    "roles": ["owner"],
    "operation": "change_recovery_account",
    "params": [
      "account_to_recover",
      "new_recovery_account",
      "extensions"
    ]
  },
  {
    "roles": ["owner"],
    "operation": "decline_adoring_rights",
    "params": [
      "account",
      "decline"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "reset_account",
    "params": [
      "reset_account",
      "account_to_reset",
      "new_owner_authority"
    ]
  },
  {
    "roles": ["owner", "posting"],
    "operation": "set_reset_account",
    "params": [
      "account",
      "current_reset_account",
      "reset_account"
    ]
  },
  {
    "roles": ["posting", "active", "owner"],
    "operation": "claim_reward_balance",
    "params": [
      "account",
      "reward_yang",
      "reward_qi",
      "reward_feigang"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "delegate_qi",
    "params": [
      "delegator",
      "delegatee",
      "qi"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "siming_set_properties",
    "params": [
      "owner",
      "props",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "create_actor",
    "params": [
      "fee",
      "creator",
      "family_name",
      "last_name"
    ]
  },
  {
    "roles": ["active"],
    "operation": "create_nfa",
    "params": [
      "creator",
      "symbol"
    ]
  },
  {
    "roles": ["active"],
    "operation": "transfer_nfa",
    "params": [
      "from",
      "to",
      "id"
    ]
  },
  {
    "roles": ["active"],
    "operation": "action_nfa",
    "params": [
      "caller",
      "id",
      "action",
      "value_list",
      "extensions"
    ]
  }
];
