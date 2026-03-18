<?php
include('db_connect.php');
header('Content-Type: application/json');

if (isset($_GET['action'])) {

    if ($_GET['action'] == 'get_user_details' && isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $result = mysqli_query($conn, "SELECT id, full_name, email, role, created_at FROM users WHERE id = $id");
        if ($result && mysqli_num_rows($result) > 0) {
            $user = mysqli_fetch_assoc($result);
            $user['created_at'] = date('M d, Y', strtotime($user['created_at']));
            echo json_encode($user);
        } else {
            echo json_encode(null);
        }
        exit();
    }

    if ($_GET['action'] == 'get_user_requests' && isset($_GET['id'])) {
        $userId = intval($_GET['id']);
        $requests = array();
        $reqResult = mysqli_query($conn, "SELECT id, relief_type as type, severity_level as severity, status FROM relief_requests WHERE user_id = $userId");
        if ($reqResult) {
            while ($row = mysqli_fetch_assoc($reqResult)) {
                $requests[] = $row;
            }
        }
        echo json_encode($requests);
        exit();
    }

    if ($_GET['action'] == 'get_users') {
        $query = "SELECT u.id, u.full_name, u.email, u.role, u.created_at,
                  (SELECT COUNT(*) FROM relief_requests r WHERE r.user_id = u.id) as total_requests
                  FROM users u ORDER BY u.created_at DESC";
        $result = mysqli_query($conn, $query);
        $users = array();
        if ($result) {
            while ($row = mysqli_fetch_assoc($result)) {
                $users[] = $row;
            }
        }
        echo json_encode($users);
        exit();
    }

    if ($_GET['action'] == 'delete_user' && isset($_POST['user_id'])) {
        $userId = intval($_POST['user_id']);
        $result = mysqli_query($conn, "DELETE FROM users WHERE id = $userId");
        if ($result) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => mysqli_error($conn)]);
        }
        exit();
    }

    if ($_GET['action'] == 'get_dashboard_summary') {
        $data = [
            'stats' => [
                'totalUsers'    => 0,
                'totalRequests' => 0,
                'highSeverity'  => 0,
                'pending'       => 0
            ],
            'reliefData' => [
                'food'     => 0,
                'water'    => 0,
                'medicine' => 0,
                'shelter'  => 0
            ],
            'recentRequests' => []
        ];

        $r = mysqli_query($conn, "SELECT COUNT(*) as count FROM users");
        if ($r) $data['stats']['totalUsers'] = mysqli_fetch_assoc($r)['count'];

        $r = mysqli_query($conn, "SELECT COUNT(*) as count FROM relief_requests");
        if ($r) $data['stats']['totalRequests'] = mysqli_fetch_assoc($r)['count'];

        $r = mysqli_query($conn, "SELECT COUNT(*) as count FROM relief_requests WHERE severity_level = 'High'");
        if ($r) $data['stats']['highSeverity'] = mysqli_fetch_assoc($r)['count'];

        $r = mysqli_query($conn, "SELECT COUNT(*) as count FROM relief_requests WHERE status = 'Pending'");
        if ($r) $data['stats']['pending'] = mysqli_fetch_assoc($r)['count'];

        $types = ['Food', 'Water', 'Medicine', 'Shelter'];
        foreach ($types as $type) {
            $r = mysqli_query($conn, "SELECT COUNT(*) as count FROM relief_requests WHERE relief_type = '$type'");
            if ($r) $data['reliefData'][strtolower($type)] = mysqli_fetch_assoc($r)['count'];
        }

        $recent = mysqli_query($conn, "SELECT r.id, u.full_name as userName, r.relief_type as type, r.district, r.severity_level as severity, r.status FROM relief_requests r LEFT JOIN users u ON r.user_id = u.id ORDER BY r.created_at DESC LIMIT 10");
        if ($recent) {
            while ($row = mysqli_fetch_assoc($recent)) {
                $row['reliefTypes'] = [$row['type']];
                $data['recentRequests'][] = $row;
            }
        }

        echo json_encode($data);
        exit();
    }

    if ($_GET['action'] == 'get_filtered_report') {
        $district = isset($_POST['district']) ? mysqli_real_escape_string($conn, $_POST['district']) : '';
        $type     = isset($_POST['type'])     ? mysqli_real_escape_string($conn, $_POST['type'])     : '';

        $reportData = [
            'summary' => [
                'total_users'       => 0,
                'high_severity'     => 0,
                'food_requests'     => 0,
                'medicine_requests' => 0
            ],
            'requests' => []
        ];

        $r = mysqli_query($conn, "SELECT COUNT(*) as count FROM users");
        if ($r) $reportData['summary']['total_users'] = mysqli_fetch_assoc($r)['count'];

        $where = [];
        if ($district != '') $where[] = "district = '$district'";
        if ($type != '')     $where[] = "relief_type = '$type'";
        $whereSql = count($where) > 0 ? "WHERE " . implode(" AND ", $where) : "";
        $andSql   = $whereSql ? "AND" : "WHERE";

        $r = mysqli_query($conn, "SELECT COUNT(*) as count FROM relief_requests $whereSql $andSql severity_level = 'High'");
        if ($r) $reportData['summary']['high_severity'] = mysqli_fetch_assoc($r)['count'];

        $r = mysqli_query($conn, "SELECT COUNT(*) as count FROM relief_requests $whereSql $andSql relief_type = 'Food'");
        if ($r) $reportData['summary']['food_requests'] = mysqli_fetch_assoc($r)['count'];

        $r = mysqli_query($conn, "SELECT COUNT(*) as count FROM relief_requests $whereSql $andSql relief_type = 'Medicine'");
        if ($r) $reportData['summary']['medicine_requests'] = mysqli_fetch_assoc($r)['count'];

        $query = "SELECT r.id, u.full_name as user_name, r.relief_type as type, r.severity_level as severity, r.status, r.district, r.divisional_secretariat, r.gn_division FROM relief_requests r LEFT JOIN users u ON r.user_id = u.id $whereSql";
        $res = mysqli_query($conn, $query);
        if ($res) {
            while ($row = mysqli_fetch_assoc($res)) {
                $reportData['requests'][] = $row;
            }
        }

        echo json_encode($reportData);
        exit();
    }
}
?>
