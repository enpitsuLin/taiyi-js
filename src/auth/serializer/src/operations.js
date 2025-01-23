import types from "./types"
import SerializerImpl from "./serializer"

const {
    //id_type,
    //varint32, uint8, int64, fixed_array, object_id_type, vote_id, address,
    uint8, uint16, int16, uint32, uint64, int64, uint128,
    string, string_binary, bytes, bool, array,
    // protocol_id_type,
    static_variant, map, set,
    public_key,
    time_point_sec,
    optional,
    asset,
    asset_symbol
} = types

const future_extensions = types.void
const hardfork_version_vote = types.void
const version = types.void
const required_automated_actions = types.void
const optional_automated_actions = types.void

// Place-holder, their are dependencies on "operation" .. The final list of
// operations is not avialble until the very end of the generated code.
// See: operation.st_operations = ...
const operation = static_variant();
module.exports.operation = operation;

// For module.exports
const Serializer=function(operation_name, serilization_types_object){
    const s = new SerializerImpl(operation_name, serilization_types_object);
    return module.exports[operation_name] = s;
}

let signed_transaction = new Serializer(
    "signed_transaction", {
    ref_block_num: uint16,
    ref_block_prefix: uint32,
    expiration: time_point_sec,
    operations: array(operation),
    extensions: set(future_extensions),
    signatures: array(bytes(65))
}
);

let signed_block = new Serializer(
    "signed_block", {
    previous: bytes(20),
    timestamp: time_point_sec,
    siming: string,
    transaction_merkle_root: bytes(20),
    extensions: set(static_variant([
        future_extensions,
        version,
        hardfork_version_vote
    ])),
    siming_signature: bytes(65),
    transactions: array(signed_transaction)
}
);

let block_header = new Serializer(
    "block_header", {
    previous: bytes(20),
    timestamp: time_point_sec,
    siming: string,
    transaction_merkle_root: bytes(20),
    extensions: set(static_variant([
        future_extensions,
        version,
        hardfork_version_vote
    ]))
}
);

let signed_block_header = new Serializer(
    "signed_block_header", {
    previous: bytes(20),
    timestamp: time_point_sec,
    siming: string,
    transaction_merkle_root: bytes(20),
    extensions: set(static_variant([
        future_extensions,
        version,
        hardfork_version_vote
    ])),
    siming_signature: bytes(65)
}
);

let transfer = new Serializer(
    "transfer", {
    from: string,
    to: string,
    amount: asset,
    memo: string
}
);

let transfer_to_qi = new Serializer(
    "transfer_to_qi", {
    from: string,
    to: string,
    amount: asset
}
);

let withdraw_qi = new Serializer(
    "withdraw_qi", {
    account: string,
    qi: asset
}
);

let price = new Serializer(
    "price", {
    base: asset,
    quote: asset
}
);

var authority = new Serializer(
    "authority", {
    weight_threshold: uint32,
    account_auths: map((string), (uint16)),
    key_auths: map((public_key), (uint16))
}
);

let account_create = new Serializer(
    "account_create", {
    fee: asset,
    creator: string,
    new_account_name: string,
    owner: authority,
    active: authority,
    posting: authority,
    memo_key: public_key,
    json_metadata: string
}
);

let account_update = new Serializer(
    "account_update", {
    account: string,
    owner: optional(authority),
    active: optional(authority),
    posting: optional(authority),
    memo_key: public_key,
    json_metadata: string
}
);

let chain_properties = new Serializer(
    "chain_properties", {
    account_creation_fee: asset,
    maximum_block_size: uint32
}
);

let siming_update = new Serializer(
    "siming_update", {
    owner: string,
    url: string,
    block_signing_key: public_key,
    props: chain_properties,
    fee: asset
}
);

let account_siming_adore = new Serializer(
    "account_siming_adore", {
    account: string,
    siming: string,
    approve: bool
}
);

let account_siming_proxy = new Serializer(
    "account_siming_proxy", {
    account: string,
    proxy: string
}
);

let custom = new Serializer(
    "custom", {
    required_auths: set(string),
    id: uint16,
    data: bytes()
}
);

let custom_json = new Serializer(
    "custom_json", {
    required_auths: set(string),
    required_posting_auths: set(string),
    id: string,
    json: string
}
);

let set_withdraw_qi_route = new Serializer(
    "set_withdraw_qi_route", {
    from_account: string,
    to_account: string,
    percent: uint16,
    auto_vest: bool
}
);

let request_account_recovery = new Serializer(
    "request_account_recovery", {
    recovery_account: string,
    account_to_recover: string,
    new_owner_authority: authority,
    extensions: set(future_extensions)
}
);

let recover_account = new Serializer(
    "recover_account", {
    account_to_recover: string,
    new_owner_authority: authority,
    recent_owner_authority: authority,
    extensions: set(future_extensions)
}
);

let change_recovery_account = new Serializer(
    "change_recovery_account", {
    account_to_recover: string,
    new_recovery_account: string,
    extensions: set(future_extensions)
}
);

let decline_adoring_rights = new Serializer(
    "decline_adoring_rights", {
    account: string,
    decline: bool
}
);

let reset_account = new Serializer(
    "reset_account", {
    reset_account: string,
    account_to_reset: string,
    new_owner_authority: authority
}
);

let set_reset_account = new Serializer(
    "set_reset_account", {
    account: string,
    current_reset_account: string,
    reset_account: string
}
);

let claim_reward_balance = new Serializer(
    "claim_reward_balance", {
    account: string,
    reward_yang: asset,
    reward_qi: asset,
    reward_feigang: asset
}
);

let create_contract = new Serializer(
    "create_contract", 
    {
    }
);

let revise_contract = new Serializer(
    "revise_contract", 
    {
    }
);

let call_contract_function = new Serializer(
    "call_contract_function", 
    {
    }
);

let create_nfa_symbol = new Serializer(
    "create_nfa_symbol", 
    {
    }
);

let create_nfa = new Serializer(
    "create_nfa", 
    {
        creator: string,
        symbol: string
    }
);

let transfer_nfa = new Serializer(
    "transfer_nfa", 
    {
        from: string,
        to: string,
        id: int64
    }
);

let approve_nfa_active = new Serializer(
    "approve_nfa_active", 
    {
    }
);

let action_nfa = new Serializer(
    "action_nfa", {
    caller: string,
    id: int64,
    action: string,
    value_list: array(string),
    extensions: array(string)
}
);

let delegate_qi = new Serializer(
    "delegate_qi", {
    delegator: string,
    delegatee: string,
    qi: asset
}
);

let siming_set_properties = new Serializer(
    "siming_set_properties", {
    owner: string,
    props: string,
    extensions: set(future_extensions)
}
);

let create_zone = new Serializer(
    "create_zone",
    {        
    }
);
  
let create_actor_talent_rule = new Serializer(
    "create_actor_talent_rule",
    {        
    }
);

let create_actor = new Serializer(
    "create_actor",
    {        
        fee: asset,
        creator: string,
        family_name: string,
        last_name: string
    }
);

let hardfork = new Serializer(
    "hardfork",
    {hardfork_id: uint32}
);

let return_qi = new Serializer(
    "return_qi", {
    account: string,
    vesting_shares: asset
}
);

let fill_qi_withdraw = new Serializer(
    "fill_qi_withdraw",
    {}
);

let return_qi_delegation = new Serializer(
    "return_qi_delegation",
    {}
);

let producer_reward = new Serializer(
    "producer_reward",
    {}
);

let nfa_convert_resources = new Serializer(
    "nfa_convert_resources",
    {}
);

let nfa_trasfer = new Serializer(
    "nfa_trasfer",
    {}
);

let nfa_deposit_withdraw = new Serializer(
    "nfa_deposit_withdraw",
    {}
);

let reward_feigang = new Serializer(
    "reward_feigang",
    {}
);

let reward_cultivation = new Serializer(
    "reward_cultivation",
    {}
);

let tiandao_year_change = new Serializer(
    "tiandao_year_change",
    {}
);

let tiandao_month_change = new Serializer(
    "tiandao_month_change",
    {}
);

let tiandao_time_change = new Serializer(
    "tiandao_time_change",
    {}
);

let actor_born = new Serializer(
    "actor_born",
    {}
);

let actor_talent_trigger = new Serializer(
    "actor_talent_trigger",
    {}
);

let actor_movement = new Serializer(
    "actor_movement",
    {}
);

let actor_grown_operation = new Serializer(
    "actor_grown_operation",
    {}
);

let narrate_log_operation = new Serializer(
    "narrate_log_operation",
    {}
);

operation.st_operations = [
    account_create,
    account_update,
  
    transfer,
    transfer_to_qi,
    withdraw_qi,
    set_withdraw_qi_route,
    delegate_qi,
  
    siming_update,
    siming_set_properties,
    account_siming_adore,
    account_siming_proxy,
    decline_adoring_rights,
  
    custom,
    custom_json,
  
    request_account_recovery,
    recover_account,
    change_recovery_account,
        
    claim_reward_balance,
  
    // contract
    create_contract,
    revise_contract,
    call_contract_function,
  
    // nfa (non fungible asset)
    create_nfa_symbol,
    create_nfa,
    transfer_nfa,
    approve_nfa_active,
    action_nfa,
  
    // zone
    create_zone,
  
    // actor
    create_actor_talent_rule,
    create_actor,
  
    //**** virtual operations below this point
    hardfork,
    fill_qi_withdraw,
    return_qi_delegation,
    producer_reward,
  
    nfa_convert_resources,
    nfa_trasfer,
    nfa_deposit_withdraw,
    reward_feigang,
    reward_cultivation,
  
    tiandao_year_change,
    tiandao_month_change,
    tiandao_time_change,
  
    actor_born,
    actor_talent_trigger,
    actor_movement,
    actor_grown_operation,
    narrate_log_operation
  ];

let transaction = new Serializer(
    "transaction", {
    ref_block_num: uint16,
    ref_block_prefix: uint32,
    expiration: time_point_sec,
    operations: array(operation),
    extensions: set(future_extensions)
}
);

// Custom Types (do not over-write)

const encrypted_memo = new Serializer(
    "encrypted_memo",
    {from: public_key,
    to: public_key,
    nonce: uint64,
    check: uint32,
    encrypted: string_binary}
);
